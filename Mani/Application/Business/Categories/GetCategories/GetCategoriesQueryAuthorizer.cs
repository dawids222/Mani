using Application.Authorization.Contract;
using Application.Authorization.Requirements;

namespace Application.Business.Categories.GetCategories
{
    public class GetCategoriesQueryAuthorizer : AbstractRequestAuthorizer<GetCategoriesQuery>
    {
        public override void BuildPolicy(GetCategoriesQuery instance)
        {
            UseRequirement(new MustBeAuthenticatedRequirement());
        }
    }
}
