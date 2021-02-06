using Domain.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IUsersRepository
    {
        Task<IEnumerable<User>> GetAsync(CancellationToken token);
        Task<User> GetAsync(string email, CancellationToken token);
        Task AddAsync(User user, CancellationToken token);
        Task<bool> ExistsAsync(long id, CancellationToken token);
        Task<bool> IsEmailAvailableAsync(string email, CancellationToken token);
        Task<bool> IsEmailTakenAsync(string email, CancellationToken token);
        Task SaveAsync(CancellationToken token);
    }
}
