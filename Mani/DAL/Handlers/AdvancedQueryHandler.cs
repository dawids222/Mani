using Application.Requests.Handlers;
using Application.Requests.Queries;
using System.Linq;

namespace DAL.Handlers
{
    public class AdvancedQueryHandler<T> : IAdvancedQueryHandler<T>
    {
        public int AllItemsCount { get; private set; }

        private readonly IFilterQueryHandler<T> _filter;
        private readonly ISearchQueryHandler<T> _searcher;
        private readonly IOrderByQueryHandler<T> _sorter;
        private readonly IPaginationQueryHandler<T> _paginator;

        public AdvancedQueryHandler(
            IFilterQueryHandler<T> filter,
            ISearchQueryHandler<T> searcher,
            IOrderByQueryHandler<T> sorter,
            IPaginationQueryHandler<T> paginator)
        {
            _filter = filter;
            _searcher = searcher;
            _sorter = sorter;
            _paginator = paginator;
        }

        public IQueryable<T> Process(IQueryable<T> entities, IAdvancedQuery query)
        {
            var filteredItems = _filter.Filter(entities, query);
            var searchedItems = _searcher.Search(filteredItems, query);
            var sortedItems = _sorter.Sort(searchedItems, query);
            var paginatedItems = _paginator.Paginate(sortedItems, query);
            AllItemsCount = searchedItems.Count();
            return paginatedItems;
        }
    }
}
