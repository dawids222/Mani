using Application.Authorization.Contract;
using Application.Common.Data;
using Application.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authorization.Requirements
{
    public class MustBeAuthorizedRequirement : IAuthorizationRequirement
    {
        private class MustBeAuthorizedRequirementHandler : IAuthorizationHandler<MustBeAuthorizedRequirement>
        {
            private IUsersRepository UsersRepository { get; }
            private ICurrentUserService CurrentUserService { get; }

            public MustBeAuthorizedRequirementHandler(
                ICurrentUserService currentUserService,
                IUsersRepository usersRepository)
            {
                CurrentUserService = currentUserService;
                UsersRepository = usersRepository;
            }

            public async Task<AuthorizationResult> Handle(
                MustBeAuthorizedRequirement request,
                CancellationToken cancellationToken)
            {
                if (!CurrentUserService.UserId.HasValue)
                    return AuthorizationResult.Fail("Brak dostępu dla niezalogowanego użytkownika.");

                var userExists = await UsersRepository.ExistsAsync(CurrentUserService.UserId.Value, cancellationToken);

                return userExists
                    ? AuthorizationResult.Succeed()
                    : AuthorizationResult.Fail(
                        "Wykonana żądanie jako użytkownik, który już nie istnieje. Proszę zaloguj się na inne konto.");
            }
        }
    }
}
