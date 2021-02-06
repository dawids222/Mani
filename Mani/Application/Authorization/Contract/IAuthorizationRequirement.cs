using MediatR;

namespace Application.Authorization.Contract
{
    public interface IAuthorizationRequirement : IRequest<AuthorizationResult>
    {
    }
}
