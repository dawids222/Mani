using Application.Common.Security.JWT;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Authentication.Login
{
    public class LoginCommand : IRequest<LoginCommandVm>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginCommandVm>
    {
        private IUsersRepository UsersRepository { get; }
        private IJwtService JwtService { get; }

        public LoginCommandHandler(
            IUsersRepository usersRepository,
            IJwtService jwtService)
        {
            UsersRepository = usersRepository;
            JwtService = jwtService;
        }

        public async Task<LoginCommandVm> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await UsersRepository.GetAsync(request.Email, cancellationToken);
            var jwtToken = JwtService.CreateToken(user);
            return new LoginCommandVm(jwtToken);
        }
    }
}
