using Application.Common.Resources.String;
using Domain.Entities;
using FluentValidation;

namespace Application.Business.Accounts.AddAccount
{
    public class AddAccountCommandValidator : AbstractValidator<AddAccountCommand>
    {
        private IStringResources Resource { get; }

        private string NameMaxLengthError => string.Format(Resource.AccountNameMaxLengthError, Account.NAME_MAX_LENGTH);
        private string LogoMaxLengthError => string.Format(Resource.AccountLogoMaxLengthError, Account.LOGO_MAX_LENGTH);
        private string ColorMaxLengthError => string.Format(Resource.AccountColorMaxLengthError, Account.COLOR_MAX_LENGTH);
        private string DescriptionMaxLengthError => string.Format(Resource.AccountDescriptionMaxLengthError, Account.DESCRIPTION_MAX_LENGTH);

        public AddAccountCommandValidator(IStringResources resource)
        {
            Resource = resource;

            RuleFor(r => r.Name)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage(resource.AccountNameEmptyError)
                .MaximumLength(Account.NAME_MAX_LENGTH).WithMessage(NameMaxLengthError);

            RuleFor(r => r.Logo)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage(resource.AccountLogoEmptyError)
                .MaximumLength(Account.LOGO_MAX_LENGTH).WithMessage(LogoMaxLengthError);

            RuleFor(r => r.Color)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage(resource.AccountColorEmptyError)
                .MaximumLength(Account.COLOR_MAX_LENGTH).WithMessage(ColorMaxLengthError);

            RuleFor(r => r.Description)
                .Cascade(CascadeMode.Stop)
                .MaximumLength(Account.DESCRIPTION_MAX_LENGTH).WithMessage(DescriptionMaxLengthError);
        }
    }
}
