using Application.Requests.Queries;
using System.Linq;

namespace Application.Requests.Handlers
{
    public interface ISearchQueryHandler<T>
    {
        IQueryable<T> Search(IQueryable<T> entities, ISearchQuery query);
    }
}
