using Application.Common.Resources.String;
using FluentValidation;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQueryValidator : AbstractValidator<GetUsersQuery>
    {
        private IStringResources Resources { get; }

        public GetUsersQueryValidator(IStringResources resources)
        {
            Resources = resources;
        }
    }
}
