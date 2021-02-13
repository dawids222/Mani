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
    }
}
