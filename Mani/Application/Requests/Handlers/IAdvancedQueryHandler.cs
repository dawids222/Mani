using Application.Requests.Queries;
using System.Linq;

namespace Application.Requests.Handlers
{
    public interface IAdvancedQueryHandler<T>
    {
        int AllItemsCount { get; }
        IQueryable<T> Process(IQueryable<T> entities, IAdvancedQuery query);
    }
}
