using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Categories.GetCategory
{
    public record GetCategoryQuery(long Id) : IRequest<GetCategoryQueryVm>;

    public record GetCategoryQueryHandler(
            ICategoriesRepository CategoriesRepository,
            IEntityMapper EntityMapper
        ) : IRequestHandler<GetCategoryQuery, GetCategoryQueryVm>
    {
        public async Task<GetCategoryQueryVm> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            var category = await CategoriesRepository.GetAsync(request.Id, cancellationToken);
            return EntityMapper.MapTo<GetCategoryQueryVm>(category);
        }
    }
}
