namespace Application.Requests.Queries
{
    public class AdvancedQuery : IAdvancedQuery
    {
        public int? Page { get; set; }
        public int? ItemsPerPage { get; set; }
        public string OrderBy { get; set; }
        public string Search { get; set; }
        public string Filter { get; set; }

        public AdvancedQuery() { }

        public AdvancedQuery(
            int? page = 1,
            int? itemsPerPage = 10,
            string orderBy = "",
            string search = "",
            string filter = "")
        {
            Page = page;
            ItemsPerPage = itemsPerPage;
            OrderBy = orderBy;
            Search = search;
            Filter = filter;
        }

        public AdvancedQuery(IAdvancedQuery query)
            : this(query.Page,
                  query.ItemsPerPage,
                  query.OrderBy,
                  query.Search,
                  query.Filter)
        { }
    }
}
