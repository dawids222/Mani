using Application.Requests.Queries;
using System.Linq;

namespace Application.Requests.Handlers
{
    public interface IPaginationQueryHandler<T>
    {
        IQueryable<T> Paginate(IQueryable<T> entities, IPaginationQuery query);
    }
}
