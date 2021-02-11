using Application.Common.Mapping;
using Application.Repositories;
using Application.Requests.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQuery : IRequest<GetUsersQueryVm>
    {
        public IAdvancedQuery Query { get; }

        public GetUsersQuery(IAdvancedQuery query)
        {
            Query = query;
        }
    }

    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, GetUsersQueryVm>
    {
        private IUsersRepository UsersRepository { get; }
        private IEntityMapper EntityMapper { get; }

        public GetUsersQueryHandler(
            IUsersRepository usersRepository,
            IEntityMapper entityMapper)
        {
            UsersRepository = usersRepository;
            EntityMapper = entityMapper;
        }

        public async Task<GetUsersQueryVm> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await UsersRepository.GetAsync(request.Query, cancellationToken);
            return EntityMapper.MapTo<GetUsersQueryVm>(users);
        }
    }
}
