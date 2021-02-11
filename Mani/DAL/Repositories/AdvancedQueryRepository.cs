using Application.Repositories.Contract;
using Application.Requests.Handlers;
using Application.Requests.Queries;
using Application.Requests.Responses;
using Domain.Entities.Contract;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public abstract class AdvancedQueryRepository<T>
        : Repository<T>, IAdvancedQueryRepository<T>
        where T : class, IEntity
    {
        private IAdvancedQueryHandler<T> AdvancedQueryProcessor { get; }

        public AdvancedQueryRepository(
            ApplicationDbContext context,
            IAdvancedQueryHandler<T> advancedQueryProcessor) : base(context)
        {
            AdvancedQueryProcessor = advancedQueryProcessor;
        }

        public async Task<PaginationVm<T>> GetAsync(IAdvancedQuery query, CancellationToken token)
        {
            var items = await AdvancedQueryProcessor
                .Process(Context.Set<T>(), query)
                .ToListAsync(token);
            return new PaginationVm<T>(items, AdvancedQueryProcessor.AllItemsCount);
        }
    }
}
