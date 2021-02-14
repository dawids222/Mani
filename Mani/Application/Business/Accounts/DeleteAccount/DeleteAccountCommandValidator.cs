using Application.Business.Accounts.GetAccount;
using Application.Common.Data;
using Application.Common.Mapping;
using Application.Common.Resources.String;
using Application.Repositories;
using FluentValidation;

namespace Application.Business.Accounts.DeleteAccount
{
    public class DeleteAccountCommandValidator : AbstractValidator<DeleteAccountCommand>
    {
        private IEntityMapper EntityMapper { get; }

        public DeleteAccountCommandValidator(
            IAccountsRepository accountsRepository,
            ICurrentUserService currentUserService,
            IStringResources resource,
            IEntityMapper entityMapper)
        {
            EntityMapper = entityMapper;

            RuleFor(r => EntityMapper.MapTo<GetAccountQuery>(r))
                .SetValidator(new GetAccountQueryValidator(accountsRepository, currentUserService, resource));
        }
    }
}
