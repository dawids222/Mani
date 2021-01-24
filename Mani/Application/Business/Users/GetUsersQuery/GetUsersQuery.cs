using Application.Repositories;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Users.GetUsersQuery
{
    public class GetUsersQuery : IRequest<GetUsersQueryVm>
    {
    }

    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, GetUsersQueryVm>
    {
        private IUsersRepository UsersRepository { get; }

        public GetUsersQueryHandler(IUsersRepository usersRepository)
        {
            UsersRepository = usersRepository;
        }

        public async Task<GetUsersQueryVm> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await UsersRepository.Get(cancellationToken);
            var mappedUsers = users.Select(u => new GetUsersQueryVmItem
            {
                Id = u.Id,
                Email = u.Email,
            });
            return new GetUsersQueryVm(mappedUsers);
        }
    }
}
