using Application.Common.Security.Encryption;
using Application.Repositories;
using FluentValidation;

namespace Application.Business.Authentication.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        private IUsersRepository UsersRepository { get; }
        private IEncryptor Encryptor { get; }

        public LoginCommandValidator(IUsersRepository usersRepository, IEncryptor encryptor)
        {
            UsersRepository = usersRepository;
            Encryptor = encryptor;

            RuleFor(r => r.Password)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("a");

            RuleFor(r => r.Email)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("a")
                .EmailAddress().WithMessage("a")
                .MustAsync(UsersRepository.IsEmailTakenAsync).WithMessage("a")
                .MustAsync(async (request, email, token) =>
                {
                    var user = await UsersRepository.GetAsync(email, token);
                    return Encryptor.Match(user.Password, request.Password);
                }).WithMessage("a");
        }
    }
}
