using Domain.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IUsersRepository
    {
        Task<IEnumerable<User>> Get(CancellationToken token);
    }
}
