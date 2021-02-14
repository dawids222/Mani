using Application.Repositories.Contract;
using Application.Requests.Queries;
using Application.Requests.Responses;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IAccountsRepository : IAdvancedQueryRepository<Account>
    {
        Task<PaginationVm<Account>> GetAsync(long userId, IAdvancedQuery query, CancellationToken token);
        Task<bool> ExistsAndBelongsToUserAsync(long accountId, long userId, CancellationToken token);
    }
}
