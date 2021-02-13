using Application.Common.Resources.String;
using Application.Common.Validators;
using FluentValidation;

namespace Application.Business.Accounts.GetAccounts
{
    public class GetAccountsQueryValidator : AbstractValidator<GetAccountsQuery>
    {
        public GetAccountsQueryValidator(IStringResources resources)
        {
            RuleFor(r => r.Query)
                .SetValidator(new AdvancedQueryValidator(resources));
        }
    }
}
