using Application.Common.Resources.String;
using Domain.Entities;
using FluentValidation;

namespace Application.Business.Settings.EditSettings
{
    public class EditSettingsCommandValidator : AbstractValidator<EditSettingsCommand>
    {
        private IStringResources Resources { get; }

        private string CurrencyMaxLengthError => string.Format(Resources.SettingsCurrencyMaxLengthError, Setting.CURRENCY_MAX_LENGTH);

        public EditSettingsCommandValidator(IStringResources resources)
        {
            Resources = resources;

            RuleFor(r => r.Currency)
                .Cascade(CascadeMode.Stop)
                .MaximumLength(Setting.CURRENCY_MAX_LENGTH).WithMessage(CurrencyMaxLengthError);
        }
    }
}
