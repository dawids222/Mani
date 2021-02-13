using Application.Authorization.Contract;
using Application.Authorization.Requirements;

namespace Application.Business.Accounts.AddAccount
{
    public class AddAccountCommandAuthorizer : AbstractRequestAuthorizer<AddAccountCommand>
    {
        public override void BuildPolicy(AddAccountCommand instance)
        {
            UseRequirement(new MustBeAuthenticatedRequirement());
        }
    }
}
