using Application.Repositories.Contract;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface ICategoriesRepository : IAdvancedQueryRepository<Category>
    {
        Task<bool> ExistsAndBelongsToUserAsync(long categoryId, long userId, CancellationToken token);
    }
}
