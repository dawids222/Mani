namespace Application.Requests.Queries
{
    public interface IPaginationQuery
    {
        int? Page { get; }
        int? ItemsPerPage { get; }
    }
}
