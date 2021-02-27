using Application.Authorization.Contract;
using Application.Common.Data;
using Application.Common.Resources.String;
using Application.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authorization.Requirements
{
    public class MustBeAuthenticatedRequirement : IAuthorizationRequirement
    {
        private record MustBeAuthenticatedRequirementHandler(
            ICurrentUserService CurrentUserService,
            IUsersRepository UsersRepository,
            IStringResources Resources)
            : IAuthorizationHandler<MustBeAuthenticatedRequirement>
        {
            public async Task<AuthorizationResult> Handle(
                MustBeAuthenticatedRequirement request,
                CancellationToken cancellationToken)
            {
                if (!CurrentUserService.UserId.HasValue)
                    return AuthorizationResult.Fail(Resources.AuthenticationError);

                var userExists = await UsersRepository.ExistsAsync(CurrentUserService.UserId.Value, cancellationToken);

                return userExists
                    ? AuthorizationResult.Succeed()
                    : AuthorizationResult.Fail(Resources.AuthenticationUserDeletedError);
            }
        }
    }
}
