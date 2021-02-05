using Domain.Entities;

namespace Application.Common.Security.JWT
{
    public interface IJwtService
    {
        string CreateToken(User user);
    }
}
