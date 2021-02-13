using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using Application.Requests.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.GetAccounts
{
    public class GetAccountsQuery : IRequest<GetAccountsQueryVm>
    {
        public IAdvancedQuery Query { get; set; }

        public GetAccountsQuery(IAdvancedQuery query)
        {
            Query = query;
        }
    }

    public class GetAccountsQueryHandler : IRequestHandler<GetAccountsQuery, GetAccountsQueryVm>
    {
        private IAccountsRepository AccountsRepository { get; }
        private ICurrentUserService CurrentUserService { get; }
        private IEntityMapper EntityMapper { get; }

        public GetAccountsQueryHandler(
            IAccountsRepository accountsRepository,
            ICurrentUserService currentUserService,
            IEntityMapper entityMapper)
        {
            AccountsRepository = accountsRepository;
            CurrentUserService = currentUserService;
            EntityMapper = entityMapper;
        }

        public async Task<GetAccountsQueryVm> Handle(GetAccountsQuery request, CancellationToken cancellationToken)
        {
            var userId = CurrentUserService.UserId.Value;
            var accounts = await AccountsRepository.GetAsync(userId, request.Query, cancellationToken);
            return EntityMapper.MapTo<GetAccountsQueryVm>(accounts);
        }
    }
}
