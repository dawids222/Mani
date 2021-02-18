using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using Application.Requests.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.GetAccounts
{
    public record GetAccountsQuery(IAdvancedQuery Query) : IRequest<GetAccountsQueryVm>;

    public record GetAccountsQueryHandler(
            IAccountsRepository AccountsRepository,
            ICurrentUserService CurrentUserService,
            IEntityMapper EntityMapper)
        : IRequestHandler<GetAccountsQuery, GetAccountsQueryVm>
    {
        public async Task<GetAccountsQueryVm> Handle(GetAccountsQuery request, CancellationToken cancellationToken)
        {
            var userId = CurrentUserService.UserId.Value;
            var accounts = await AccountsRepository.GetAsync(userId, request.Query, cancellationToken);
            return EntityMapper.MapTo<GetAccountsQueryVm>(accounts);
        }
    }
}
