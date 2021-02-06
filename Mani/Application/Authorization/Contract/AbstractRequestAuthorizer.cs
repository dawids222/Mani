using System.Collections.Generic;

namespace Application.Authorization.Contract
{
    public abstract class AbstractRequestAuthorizer<TRequest> : IAuthorizer<TRequest>
    {
        private HashSet<IAuthorizationRequirement> _requirements { get; } = new HashSet<IAuthorizationRequirement>();
        public IEnumerable<IAuthorizationRequirement> Requirements => _requirements;

        public abstract void BuildPolicy(TRequest instance);

        protected void UseRequirement(IAuthorizationRequirement requirement)
        {
            _requirements.Add(requirement);
        }
    }
}
