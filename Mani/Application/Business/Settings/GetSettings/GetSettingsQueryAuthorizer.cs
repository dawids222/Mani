using Application.Authorization.Contract;
using Application.Authorization.Requirements;

namespace Application.Business.Settings.GetSettings
{
    public class GetSettingsQueryAuthorizer : AbstractRequestAuthorizer<GetSettingsQuery>
    {
        public override void BuildPolicy(GetSettingsQuery instance)
        {
            UseRequirement(new MustBeAuthenticatedRequirement());
        }
    }
}
