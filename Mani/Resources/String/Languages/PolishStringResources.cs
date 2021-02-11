﻿using Application.Common.Resources.String;

namespace Resources.String.Languages
{
    public class PolishStringResources : IStringResources
    {
        public string AppName => "MANI";

        public string EmptyEmailError => "Należy podać adres email";
        public string InvalidEmailError => "Niepoprawny adres email";
        public string TakenEmailError => "Podany adres email jest już w użyciu";
        public string EmptyPasswordError => "Należy podać hasło";
        public string InvalidPasswordError => "Hasło musi składać się z przynajmniej 8 znaków";
        public string DifferentPasswordsError => "Hasła nie są identyczne";
        public string DataLoginError => "Niepoprawne dane logowania";

        public string AuthenticationError => "Brak dostępu dla niezalogowanego użytkownika";
        public string AuthenticationUserDeletedError => "Wykonana żądanie jako użytkownik, który już nie istnieje. Proszę zaloguj się na inne konto";

        public string ItemsPerPageMinError => "Liczba elementów na stronie musi być większa bądź równa {0}";
        public string ItemsPerPageMaxError => "Liczba elementów na stronie musi być mniejsza bądź równa {0}";
        public string PageMinError => "Strona musi być większa bądź równa {0}";
    }
}
