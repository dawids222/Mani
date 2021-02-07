using Application.Common.Resources.String;
using Application.Common.Security.Encryption;
using Application.Repositories;
using FluentValidation;

namespace Application.Business.Authentication.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        private IUsersRepository UsersRepository { get; }
        private IStringResources Resources { get; }
        private IEncryptor Encryptor { get; }

        public LoginCommandValidator(
            IUsersRepository usersRepository,
            IStringResources resources,
            IEncryptor encryptor)
        {
            UsersRepository = usersRepository;
            Resources = resources;
            Encryptor = encryptor;

            RuleFor(r => r.Password)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage(Resources.EmptyPasswordError);

            RuleFor(r => r.Email)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage(Resources.EmptyEmailError)
                .EmailAddress().WithMessage(Resources.InvalidEmailError)
                .MustAsync(async (request, email, token) =>
                {
                    var user = await UsersRepository.GetAsync(email, token);
                    if (user == null) { return false; }
                    return Encryptor.Match(user.Password, request.Password);
                }).WithMessage(Resources.DataLoginError);
        }
    }
}
