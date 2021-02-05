namespace Application.Business.Authentication.Login
{
    public class LoginCommandVm
    {
        public string Token { get; }

        public LoginCommandVm(string token)
        {
            Token = token;
        }
    }
}
