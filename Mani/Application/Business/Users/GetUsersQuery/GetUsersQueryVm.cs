using System.Collections.Generic;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQueryVm
    {
        public IEnumerable<GetUsersQueryVmItem> Items { get; set; }

        public GetUsersQueryVm(IEnumerable<GetUsersQueryVmItem> items)
        {
            Items = items;
        }
    }

    public class GetUsersQueryVmItem
    {
        public long Id { get; set; }
        public string Email { get; set; }
    }
}
