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
        private class MustBeAuthenticatedRequirementHandler : IAuthorizationHandler<MustBeAuthenticatedRequirement>
        {
            private IUsersRepository UsersRepository { get; }
            private ICurrentUserService CurrentUserService { get; }
            private IStringResources Resources { get; }

            public MustBeAuthenticatedRequirementHandler(
                ICurrentUserService currentUserService,
                IUsersRepository usersRepository,
                IStringResources resources)
            {
                CurrentUserService = currentUserService;
                UsersRepository = usersRepository;
                Resources = resources;
            }

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
