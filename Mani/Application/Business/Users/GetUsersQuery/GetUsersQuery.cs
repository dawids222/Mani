using Application.Common.Mapping;
using Application.Repositories;
using Application.Requests.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Users.GetUsersQuery
{
    public record GetUsersQuery(IAdvancedQuery Query) : IRequest<GetUsersQueryVm>;

    public record GetUsersQueryHandler(
            IUsersRepository UsersRepository,
            IEntityMapper EntityMapper
        ) : IRequestHandler<GetUsersQuery, GetUsersQueryVm>
    {
        public async Task<GetUsersQueryVm> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await UsersRepository.GetAsync(request.Query, cancellationToken);
            return EntityMapper.MapTo<GetUsersQueryVm>(users);
        }
    }
}
