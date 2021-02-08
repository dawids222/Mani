using Domain.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IUsersRepository : IRepository<User>
    {
        Task<User> GetAsync(string email, CancellationToken token);   
        Task<bool> IsEmailAvailableAsync(string email, CancellationToken token);
        Task<bool> IsEmailTakenAsync(string email, CancellationToken token);
    }
}
