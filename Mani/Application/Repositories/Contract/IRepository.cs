using Domain.Entities.Contract;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories.Contract
{
    public interface IRepository<T> where T : class, IEntity
    {
        Task<IEnumerable<T>> GetAsync(CancellationToken token);
        Task<T> GetAsync(long id, CancellationToken token);
        Task AddAsync(T entity, CancellationToken token);
        Task RemoveAsync(long id, CancellationToken token);
        Task RemoveAsync(T entity, CancellationToken token);
        Task<bool> ExistsAsync(long id, CancellationToken token);
        Task SaveAsync(CancellationToken token);
    }
}
