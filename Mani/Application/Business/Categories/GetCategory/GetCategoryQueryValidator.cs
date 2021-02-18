using Application.Common.Data;
using Application.Common.Resources.String;
using Application.Repositories;
using FluentValidation;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Categories.GetCategory
{
    public class GetCategoryQueryValidator : AbstractValidator<GetCategoryQuery>
    {
        private ICategoriesRepository CategoriesRepository { get; }
        private ICurrentUserService CurrentUserService { get; }
        private IStringResources Resource { get; }

        public GetCategoryQueryValidator(
            ICategoriesRepository categoriesRepository,
            ICurrentUserService currentUserService,
            IStringResources resource)
        {
            CategoriesRepository = categoriesRepository;
            CurrentUserService = currentUserService;
            Resource = resource;

            RuleFor(r => r.Id)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage(Resource.CategoryIdEmptyError)
                .MustAsync(ExistsAndBelongsToUser).WithMessage(Resource.CategoryIdNotExistOrBelongToUserError);
        }

        private async Task<bool> ExistsAndBelongsToUser(long categoryId, CancellationToken token)
        {
            var userId = CurrentUserService.UserId.Value;
            return await CategoriesRepository.ExistsAndBelongsToUserAsync(categoryId, userId, token);
        }
    }
}
