using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.AddAccount
{
    public class AddAccountCommand : IRequest<AddAccountCommandVm>
    {
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }

    public record AddAccountCommandHandler(
            IAccountsRepository AccountsRepository,
            ICurrentUserService CurrentUserService,
            IEntityMapper EntityMapper
        ) : IRequestHandler<AddAccountCommand, AddAccountCommandVm>
    {
        public async Task<AddAccountCommandVm> Handle(AddAccountCommand request, CancellationToken cancellationToken)
        {
            var newAccount = EntityMapper.MapTo<Account>(request);
            newAccount.UserId = CurrentUserService.UserId.Value;
            await AccountsRepository.AddAsync(newAccount, cancellationToken);
            await AccountsRepository.SaveAsync(cancellationToken);
            return EntityMapper.MapTo<AddAccountCommandVm>(newAccount);
        }
    }
}
