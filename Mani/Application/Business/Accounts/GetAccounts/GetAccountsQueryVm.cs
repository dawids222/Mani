using Application.Requests.Responses;
using System.Collections.Generic;

namespace Application.Business.Accounts.GetAccounts
{
    public class GetAccountsQueryVm : PaginationVm<GetAccountsQueryVmListItem>
    {
        public GetAccountsQueryVm(
            IEnumerable<GetAccountsQueryVmListItem> items,
            int allItemsCount) : base(items, allItemsCount) { }
    }

    public class GetAccountsQueryVmListItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Balance { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }
}
