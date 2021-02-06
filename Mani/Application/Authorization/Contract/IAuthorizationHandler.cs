using MediatR;

namespace Application.Authorization.Contract
{
    public interface IAuthorizationHandler<TRequest> : IRequestHandler<TRequest, AuthorizationResult>
        where TRequest : IAuthorizationRequirement
    {
    }
}
