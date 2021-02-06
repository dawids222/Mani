using Application.Authorization.Contract;
using Application.Authorization.Requirements;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQueryAuthorizer : AbstractRequestAuthorizer<GetUsersQuery>
    {
        public override void BuildPolicy(GetUsersQuery instance)
        {
            UseRequirement(new MustBeAuthorizedRequirement());
        }
    }
}
