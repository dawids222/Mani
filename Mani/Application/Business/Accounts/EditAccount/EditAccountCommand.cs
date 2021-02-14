using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.EditAccount
{
    public class EditAccountCommand : IRequest
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }

    public class EditAccountCommandHandler : IRequestHandler<EditAccountCommand>
    {
        private IAccountsRepository AccountsRepository { get; }
        private IEntityMapper EntityMapper { get; }

        public EditAccountCommandHandler(
            IAccountsRepository accountsRepository,
            IEntityMapper entityMapper)
        {
            AccountsRepository = accountsRepository;
            EntityMapper = entityMapper;
        }

        public async Task<Unit> Handle(EditAccountCommand request, CancellationToken cancellationToken)
        {
            var account = await AccountsRepository.GetAsync(request.Id, cancellationToken);
            EntityMapper.Copy(account, request);
            await AccountsRepository.SaveAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
