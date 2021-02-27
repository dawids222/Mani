using Application.Repositories.Contract;
using Application.Requests.Queries;
using Application.Requests.Responses;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface ICategoriesRepository : IAdvancedQueryRepository<Category>
    {
        Task<PaginationVm<Category>> GetAsync(long userId, IAdvancedQuery query, CancellationToken token);
        Task<bool> ExistsAndBelongsToUserAsync(long categoryId, long userId, CancellationToken token);
    }
}
