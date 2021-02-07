using Application.Common.Resources.String;
using Application.Repositories;
using FluentValidation;

namespace Application.Business.Authentication.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        private IUsersRepository UsersRepository { get; }
        private IStringResources Resources { get; }

        public RegisterCommandValidator(
            IUsersRepository usersRepository,
            IStringResources resources)
        {
            UsersRepository = usersRepository;
            Resources = resources;

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage(Resources.EmptyEmailError)
                .EmailAddress().WithMessage(Resources.InvalidEmailError)
                .MustAsync(UsersRepository.IsEmailAvailableAsync).WithMessage(Resources.TakenEmailError);

            RuleFor(r => r.Password)
                .NotEmpty().WithMessage(Resources.EmptyPasswordError)
                .MinimumLength(8).WithMessage(Resources.InvalidPasswordError);

            RuleFor(r => r.PasswordConfirmation)
                .Equal(r => r.PasswordConfirmation).WithMessage(Resources.DifferentPasswordsError);
        }
    }
}
