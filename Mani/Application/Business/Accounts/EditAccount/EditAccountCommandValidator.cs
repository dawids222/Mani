using Application.Business.Accounts.AddAccount;
using Application.Business.Accounts.GetAccount;
using Application.Common.Data;
using Application.Common.Mapping;
using Application.Common.Resources.String;
using Application.Repositories;
using FluentValidation;

namespace Application.Business.Accounts.EditAccount
{
    public class EditAccountCommandValidator : AbstractValidator<EditAccountCommand>
    {
        private IEntityMapper EntityMapper { get; }

        public EditAccountCommandValidator(
            IAccountsRepository accountsRepository,
            ICurrentUserService currentUserService,
            IStringResources resource,
            IEntityMapper entityMapper)
        {
            EntityMapper = entityMapper;

            RuleFor(r => EntityMapper.MapTo<GetAccountQuery>(r))
                .SetValidator(new GetAccountQueryValidator(accountsRepository, currentUserService, resource));

            RuleFor(r => EntityMapper.MapTo<AddAccountCommand>(r))
                .SetValidator(new AddAccountCommandValidator(resource));
        }
    }
}
