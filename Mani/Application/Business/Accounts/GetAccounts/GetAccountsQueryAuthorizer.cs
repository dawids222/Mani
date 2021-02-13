using Application.Authorization.Contract;
using Application.Authorization.Requirements;

namespace Application.Business.Accounts.GetAccounts
{
    public class GetAccountsQueryAuthorizer : AbstractRequestAuthorizer<GetAccountsQuery>
    {
        public override void BuildPolicy(GetAccountsQuery instance)
        {
            UseRequirement(new MustBeAuthenticatedRequirement());
        }
    }
}
