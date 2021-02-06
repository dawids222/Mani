using System.Collections.Generic;

namespace Application.Authorization.Contract
{
    public interface IAuthorizer<in T>
    {
        IEnumerable<IAuthorizationRequirement> Requirements { get; }
        void BuildPolicy(T instance);
    }
}
