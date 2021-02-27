using Application.Common.Resources.String;
using Application.Common.Validators;
using FluentValidation;

namespace Application.Business.Categories.GetCategories
{
    public class GetCategoriesQueryValidator : AbstractValidator<GetCategoriesQuery>
    {
        public GetCategoriesQueryValidator(IStringResources resources)
        {
            RuleFor(r => r.Query)
                .SetValidator(new AdvancedQueryValidator(resources));
        }
    }
}
