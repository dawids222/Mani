using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.DeleteAccount
{
    public class DeleteAccountCommand : IRequest
    {
        public long Id { get; set; }

        public DeleteAccountCommand(long id)
        {
            Id = id;
        }
    }

    public class DeleteAccountCommandHandler : IRequestHandler<DeleteAccountCommand>
    {
        private IAccountsRepository AccountsRepository { get; }

        public DeleteAccountCommandHandler(IAccountsRepository accountsRepository)
        {
            AccountsRepository = accountsRepository;
        }

        public async Task<Unit> Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
        {
            await AccountsRepository.RemoveAsync(request.Id, cancellationToken);
            await AccountsRepository.SaveAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
