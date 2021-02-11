using Application.Requests.Queries;
using System.Linq;

namespace Application.Requests.Handlers
{
    public interface IFilterQueryHandler<T>
    {
        IQueryable<T> Filter(IQueryable<T> entities, IFilterQuery query);
    }
}
