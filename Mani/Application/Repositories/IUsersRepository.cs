using Application.Repositories.Contract;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IUsersRepository : IAdvancedQueryRepository<User>
    {
        Task<User> GetAsync(string email, CancellationToken token);
        Task<bool> IsEmailAvailableAsync(string email, CancellationToken token);
        Task<bool> IsEmailTakenAsync(string email, CancellationToken token);
    }
}
