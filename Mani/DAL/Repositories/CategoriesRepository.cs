using Application.Repositories;
using Application.Requests.Handlers;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CategoriesRepository : AdvancedQueryRepository<Category>, ICategoriesRepository
    {
        public CategoriesRepository(
            ApplicationDbContext context,
            IAdvancedQueryHandler<Category> advancedQueryProcessor)
            : base(context, advancedQueryProcessor) { }

        public async Task<bool> ExistsAndBelongsToUserAsync(long categoryId, long userId, CancellationToken token)
        {
            return await Context.Categories.AnyAsync(c => c.Id == categoryId && c.UserId == userId, token);
        }
    }
}
