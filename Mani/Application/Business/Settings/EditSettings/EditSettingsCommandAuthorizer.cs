using Application.Authorization.Contract;
using Application.Authorization.Requirements;

namespace Application.Business.Settings.EditSettings
{
    public class EditSettingsCommandAuthorizer : AbstractRequestAuthorizer<EditSettingsCommand>
    {
        public override void BuildPolicy(EditSettingsCommand instance)
        {
            UseRequirement(new MustBeAuthenticatedRequirement());
        }
    }
}
