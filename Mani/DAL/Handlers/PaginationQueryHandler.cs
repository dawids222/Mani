using Application.Requests.Handlers;
using Application.Requests.Queries;
using System.Linq;

namespace DAL.Handlers
{
    public class PaginationQueryHandler<T> : IPaginationQueryHandler<T>
    {
        private static readonly int DEFAULT_PAGE = 1;
        private static readonly int DEFAULT_ITEMS_PER_PAGE = 10;

        public IQueryable<T> Paginate(IQueryable<T> entities, IPaginationQuery query)
        {
            var page = query.Page ?? DEFAULT_PAGE;
            var itemsPerPage = query.ItemsPerPage ?? DEFAULT_ITEMS_PER_PAGE;
            var skipCount = (page - 1) * itemsPerPage;
            var takeCount = itemsPerPage;

            if (skipCount < 0) { skipCount = 0; }
            if (takeCount < 0) { takeCount = 0; }

            return entities.Skip(skipCount).Take(takeCount);
        }
    }
}
