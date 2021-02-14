using Application.Common.Data;
using Application.Common.Resources.String;
using Application.Repositories;
using FluentValidation;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.GetAccount
{
    public class GetAccountQueryValidator : AbstractValidator<GetAccountQuery>
    {
        private IAccountsRepository AccountsRepository { get; }
        private ICurrentUserService CurrentUserService { get; }
        private IStringResources Resource { get; }

        public GetAccountQueryValidator(
            IAccountsRepository accountsRepository,
            ICurrentUserService currentUserService,
            IStringResources resource)
        {
            AccountsRepository = accountsRepository;
            CurrentUserService = currentUserService;
            Resource = resource;

            RuleFor(r => r.Id)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage(Resource.AccountIdEmptyError)
                .MustAsync(ExistsAndBelongsToUser).WithMessage(resource.AccountIdNotExistOrBelongToUserError);
        }

        private async Task<bool> ExistsAndBelongsToUser(long accountId, CancellationToken token)
        {
            var userId = CurrentUserService.UserId.Value;
            return await AccountsRepository.ExistsAndBelongsToUserAsync(accountId, userId, token);
        }
    }
}
