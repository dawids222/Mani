using Application.Repositories;
using Application.Requests.Handlers;
using Application.Requests.Queries;
using Application.Requests.Responses;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public async Task<PaginationVm<Category>> GetAsync(long userId, IAdvancedQuery query, CancellationToken token)
        {
            var items = Context.Categories.Where(c => c.UserId == userId);
            var processedItems = await AdvancedQueryHandler
                .Process(items, query)
                .ToListAsync(token);
            return new PaginationVm<Category>(processedItems, AdvancedQueryHandler.AllItemsCount);
        }

        public async Task<bool> ExistsAndBelongsToUserAsync(long categoryId, long userId, CancellationToken token)
        {
            return await Context.Categories.AnyAsync(c => c.Id == categoryId && c.UserId == userId, token);
        }
    }
}
