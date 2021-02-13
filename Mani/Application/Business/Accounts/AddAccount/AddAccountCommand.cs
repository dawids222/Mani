using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.AddAccount
{
    public class AddAccountCommand : IRequest
    {
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }

    public class AddAccountCommandHandler : IRequestHandler<AddAccountCommand>
    {
        private IAccountsRepository AccountsRepository { get; }
        private ICurrentUserService CurrentUserService { get; }
        private IEntityMapper EntityMapper { get; }

        public AddAccountCommandHandler(
            IAccountsRepository accountsRepository,
            ICurrentUserService currentUserService,
            IEntityMapper entityMapper)
        {
            AccountsRepository = accountsRepository;
            CurrentUserService = currentUserService;
            EntityMapper = entityMapper;
        }

        public async Task<Unit> Handle(AddAccountCommand request, CancellationToken cancellationToken)
        {
            var newAccount = EntityMapper.MapTo<Account>(request);
            newAccount.UserId = CurrentUserService.UserId.Value;
            await AccountsRepository.AddAsync(newAccount, cancellationToken);
            await AccountsRepository.SaveAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
