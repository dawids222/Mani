using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.DeleteAccount
{
    public record DeleteAccountCommand(long Id) : IRequest;

    public record DeleteAccountCommandHandler(
            IAccountsRepository AccountsRepository
        ) : IRequestHandler<DeleteAccountCommand>
    {
        public async Task<Unit> Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
        {
            await AccountsRepository.RemoveAsync(request.Id, cancellationToken);
            await AccountsRepository.SaveAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
