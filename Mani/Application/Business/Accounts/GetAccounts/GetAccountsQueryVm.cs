using Application.Business.Accounts.GetAccount;
using Application.Requests.Responses;
using System.Collections.Generic;

namespace Application.Business.Accounts.GetAccounts
{
    public class GetAccountsQueryVm : PaginationVm<GetAccountQueryVm>
    {
        public GetAccountsQueryVm(
            IEnumerable<GetAccountQueryVm> items,
            int allItemsCount) : base(items, allItemsCount) { }
    }
}
