using Application.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SettingsRepository : Repository<Setting>, ISettingsRepository
    {
        public SettingsRepository(ApplicationDbContext context) : base(context) { }

        public async Task<Setting> GetForUserAsync(long userId, CancellationToken token)
        {
            return await Context.Settings.FirstOrDefaultAsync(s => s.UserId == userId, token);
        }
    }
}
