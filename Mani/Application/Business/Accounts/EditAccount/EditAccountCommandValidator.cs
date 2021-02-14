using Application.Business.Accounts.AddAccount;
using Application.Common.Data;
using Application.Common.Mapping;
using Application.Common.Resources.String;
using Application.Repositories;
using FluentValidation;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.EditAccount
{
    public class EditAccountCommandValidator : AbstractValidator<EditAccountCommand>
    {
        private IAccountsRepository AccountsRepository { get; }
        private ICurrentUserService CurrentUserService { get; }
        private IStringResources Resource { get; }
        private IEntityMapper EntityMapper { get; }

        public EditAccountCommandValidator(
            IAccountsRepository accountsRepository,
            ICurrentUserService currentUserService,
            IStringResources resource,
            IEntityMapper entityMapper)
        {
            AccountsRepository = accountsRepository;
            CurrentUserService = currentUserService;
            Resource = resource;
            EntityMapper = entityMapper;

            RuleFor(r => r.Id)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage(Resource.AccountIdEmptyError)
                .MustAsync(ExistsAndBelongsToUser).WithMessage(resource.AccountIdNotExistOrBelongToUserError);

            RuleFor(r => EntityMapper.MapTo<AddAccountCommand>(r))
                .SetValidator(new AddAccountCommandValidator(resource));
        }

        private async Task<bool> ExistsAndBelongsToUser(long accountId, CancellationToken token)
        {
            var userId = CurrentUserService.UserId.Value;
            return await AccountsRepository.ExistsAndBelongsToUserAsync(accountId, userId, token);
        }
    }
}
