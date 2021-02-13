using Application.Common.Resources.String;
using Application.Requests.Queries;
using FluentValidation;

namespace Application.Common.Validators
{
    public class AdvancedQueryValidator : AbstractValidator<IAdvancedQuery>
    {
        private const int PAGE_MIN_VALUE = 1;
        private const int ITEMS_PER_PAGE_MIN_VALUE = 1;
        private const int ITEMS_PER_PAGE_MAX_VALUE = 100;

        private IStringResources Resources { get; }

        private string PageMinError => string.Format(Resources.PageMinError, PAGE_MIN_VALUE);
        private string ItemsPerPageMinError => string.Format(Resources.ItemsPerPageMinError, ITEMS_PER_PAGE_MIN_VALUE);
        private string ItemsPerPageMaxError => string.Format(Resources.ItemsPerPageMaxError, ITEMS_PER_PAGE_MAX_VALUE);

        public AdvancedQueryValidator(IStringResources resources)
        {
            Resources = resources;

            RuleFor(r => r.Filter)
                .Cascade(CascadeMode.Stop);

            RuleFor(r => r.Search)
                .Cascade(CascadeMode.Stop);

            RuleFor(r => r.OrderBy)
                .Cascade(CascadeMode.Stop);

            RuleFor(r => r.ItemsPerPage)
                .Cascade(CascadeMode.Stop)
                .Must(i => i >= PAGE_MIN_VALUE).WithMessage(PageMinError)
                .When(r => r.ItemsPerPage is { });

            RuleFor(r => r.Page)
                .Cascade(CascadeMode.Stop)
                .Must(i => i >= ITEMS_PER_PAGE_MIN_VALUE).WithMessage(ItemsPerPageMinError)
                .Must(i => i <= ITEMS_PER_PAGE_MAX_VALUE).WithMessage(ItemsPerPageMaxError)
                .When(r => r.Page is { });
        }
    }
}
