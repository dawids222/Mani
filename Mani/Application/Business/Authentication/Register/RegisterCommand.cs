using Application.Common.Security.Encryption;
using Application.Repositories;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Authentication.Register
{
    public class RegisterCommand : IRequest<RegisterCommandVm>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }

    public record RegisterCommandHandler(
            IUsersRepository UsersRepository,
            IEncryptor Encryptor
        ) : IRequestHandler<RegisterCommand, RegisterCommandVm>
    {
        public async Task<RegisterCommandVm> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var newSettings = new Setting();
            var passwordHash = Encryptor.Encrypt(request.Password);
            var newUser = new User(request.Email, passwordHash, newSettings);
            await UsersRepository.AddAsync(newUser, cancellationToken);
            await UsersRepository.SaveAsync(cancellationToken);
            return new RegisterCommandVm(newUser.Id);
        }
    }
}
