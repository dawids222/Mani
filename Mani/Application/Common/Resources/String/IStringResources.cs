namespace Application.Common.Resources.String
{
    public interface IStringResources
    {
        public string AppName { get; }

        public string EmptyEmailError { get; }
        public string InvalidEmailError { get; }
        public string TakenEmailError { get; }
        public string EmptyPasswordError { get; }
        public string InvalidPasswordError { get; }
        public string DifferentPasswordsError { get; }
        public string DataLoginError { get; }

        public string AuthenticationError { get; }
        public string AuthenticationUserDeletedError { get; }

        public string ItemsPerPageMinError { get; }
        public string ItemsPerPageMaxError { get; }
        public string PageMinError { get; }

        public string SettingsCurrencyMaxLengthError { get; }

        public string AccountNameMaxLengthError { get; }
        public string AccountNameEmptyError { get; }
        public string AccountLogoMaxLengthError { get; }
        public string AccountLogoEmptyError { get; }
        public string AccountColorMaxLengthError { get; }
        public string AccountColorEmptyError { get; }
        public string AccountDescriptionMaxLengthError { get; }
    }
}
