using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using Application.Requests.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Categories.GetCategories
{
    public record GetCategoriesQuery(IAdvancedQuery Query) : IRequest<GetCategoriesQueryVm>;

    public record GetCategoriesQueryHandler(
            ICategoriesRepository CategoriesRepository,
            ICurrentUserService CurrentUserService,
            IEntityMapper EntityMapper)
        : IRequestHandler<GetCategoriesQuery, GetCategoriesQueryVm>
    {
        public async Task<GetCategoriesQueryVm> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var userId = CurrentUserService.UserId.Value;
            var accounts = await CategoriesRepository.GetAsync(userId, request.Query, cancellationToken);
            return EntityMapper.MapTo<GetCategoriesQueryVm>(accounts);
        }
    }
}
