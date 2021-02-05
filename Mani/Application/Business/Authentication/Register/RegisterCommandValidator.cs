using Application.Repositories;
using FluentValidation;

namespace Application.Business.Authentication.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        private IUsersRepository UsersRepository { get; }

        public RegisterCommandValidator(IUsersRepository usersRepository)
        {
            UsersRepository = usersRepository;

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Należy podać adres email")
                .EmailAddress().WithMessage("Niepoprawny adres email")
                .MustAsync(UsersRepository.IsEmailAvailableAsync).WithMessage("Podany adres email jest już w użyciu");

            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Należy podać hasło");
            // TODO wymagania hasła

            RuleFor(r => r.PasswordConfirmation)
                .Equal(r => r.PasswordConfirmation).WithMessage("Hasła nie są identyczne");
        }
    }
}
