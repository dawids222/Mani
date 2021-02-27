using Application.Authorization.Contract;
using Application.Common.Data;
using Application.Common.Resources.String;
using Application.Repositories;
using Domain.Enums;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authorization.Requirements
{
    public class MustBeAdminRequirement : IAuthorizationRequirement
    {
        private record MustBeAdminRequirementHandler(
            IUsersRepository UsersRepository,
            ICurrentUserService CurrentUserService,
            IStringResources Resources)
            : IAuthorizationHandler<MustBeAdminRequirement>
        {
            public async Task<AuthorizationResult> Handle(
                MustBeAdminRequirement request,
                CancellationToken cancellationToken)
            {
                if (!CurrentUserService.UserId.HasValue)
                    return AuthorizationResult.Fail(Resources.AuthenticationError);

                var user = await UsersRepository.GetAsync(CurrentUserService.UserId.Value, cancellationToken);

                if (user is null) { return AuthorizationResult.Fail(Resources.AuthenticationUserDeletedError); }
                if (user.Type != UserType.ADMIN) { return AuthorizationResult.Fail(Resources.AuthorizationUserTypeError); }
                return AuthorizationResult.Succeed();
            }
        }
    }
}
