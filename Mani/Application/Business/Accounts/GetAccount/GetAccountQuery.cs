using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.GetAccount
{
    public record GetAccountQuery(long Id) : IRequest<GetAccountQueryVm>;

    public class GetAccountQueryHandler : IRequestHandler<GetAccountQuery, GetAccountQueryVm>
    {
        private IAccountsRepository AccountsRepository { get; }
        private IEntityMapper EntityMapper { get; }

        public GetAccountQueryHandler(
            IAccountsRepository accountsRepository,
            IEntityMapper entityMapper)
        {
            AccountsRepository = accountsRepository;
            EntityMapper = entityMapper;
        }

        public async Task<GetAccountQueryVm> Handle(GetAccountQuery request, CancellationToken cancellationToken)
        {
            var account = await AccountsRepository.GetAsync(request.Id, cancellationToken);
            return EntityMapper.MapTo<GetAccountQueryVm>(account);
        }
    }
}
