using Application.Common.Resources.String;
using Application.Common.Validators;
using FluentValidation;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQueryValidator : AbstractValidator<GetUsersQuery>
    {
        private IStringResources Resources { get; }

        public GetUsersQueryValidator(IStringResources resources)
        {
            Resources = resources;

            RuleFor(r => r.Query)
                .SetValidator(new AdvancedQueryValidator(resources));
        }
    }
}
