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

        public string ItemsPerPageMinError => "The number of elements on the page must be greater than or equal to {0}";
        public string ItemsPerPageMaxError => "The number of elements on the page must be less than or equal to {0}";
        public string PageMinError => "The page must be greater than or equal to {0}";

        public string SettingsCurrencyMaxLengthError => "Currency may contain maximum of {0} characters";

        public string AccountNameMaxLengthError => "Name may contain maximum of {0} characters";
        public string AccountNameEmptyError => "Name is required";
        public string AccountLogoMaxLengthError => "Logo may contain maximum of {0} characters";
        public string AccountLogoEmptyError => "Logo is required";
        public string AccountColorMaxLengthError => "Color may contain maximum of {0} characters";
        public string AccountColorEmptyError => "Color is required";
        public string AccountDescriptionMaxLengthError => "Description may contain maximum of {0} characters";
    }
}
