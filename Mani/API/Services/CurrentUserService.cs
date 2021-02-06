using Application.Common.Data;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace API.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public long? UserId { get; }

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            if (long.TryParse(
                httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier),
                out long userId))
            {
                UserId = userId;
            }
        }
    }
}
