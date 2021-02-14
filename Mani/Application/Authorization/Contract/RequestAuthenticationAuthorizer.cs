using Application.Authorization.Requirements;

namespace Application.Authorization.Contract
{
    public abstract class RequestAuthenticationAuthorizer<T> : AbstractRequestAuthorizer<T>
    {
        public override void BuildPolicy(T instance)
        {
            UseRequirement(new MustBeAuthenticatedRequirement());
        }
    }
}
