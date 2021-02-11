using Application.Requests.Queries;
using System.Linq;

namespace Application.Requests.Handlers
{
    public interface IOrderByQueryHandler<T>
    {
        IQueryable<T> Sort(IQueryable<T> entities, IOrderByQuery query);
    }
}