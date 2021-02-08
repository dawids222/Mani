using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface ISettingsRepository : IRepository<Setting>
    {
        Task<Setting> GetForUserAsync(long userId, CancellationToken token);
    }
}
