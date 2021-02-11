using Application.Requests.Responses;
using System.Collections.Generic;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQueryVm : PaginationVm<GetUsersQueryVmItem>
    {
        public GetUsersQueryVm(
            IEnumerable<GetUsersQueryVmItem> items,
            int allItemsCount) : base(items, allItemsCount) { }
    }

    public class GetUsersQueryVmItem
    {
        public long Id { get; set; }
        public string Email { get; set; }
    }
}
