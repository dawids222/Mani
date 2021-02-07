using Application.Common.Resources.String;

namespace Resources.String.Languages
{
    public class EnglishStringResources : IStringResources
    {
        public string AppName => "MANI";

        public string EmptyEmailError => "Email address is required";
        public string InvalidEmailError => "Invalid email address";
        public string TakenEmailError => "This email address is already taken";
        public string EmptyPasswordError => "Password is required";
        public string InvalidPasswordError => "Password must be at least 8 characters long";
        public string DifferentPasswordsError => "Passwords are not identical";
        public string DataLoginError => "Invalid login data";

        public string AuthenticationError => "Access denied for not logged in user";
        public string AuthenticationUserDeletedError => "Logged in as a deleted user. Please log in to diffent account";
    }
}
