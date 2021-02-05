namespace Application.Common.Security.Encryption
{
    public interface IEncryptor
    {
        string Encrypt(string password);
        bool Match(string hashedPassword, string freshPassword);
    }
}
