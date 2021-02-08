using Application.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UsersRepository : Repository<User>, IUsersRepository
    {
        public UsersRepository(ApplicationDbContext context) : base(context) { }

        public async Task<User> GetAsync(string email, CancellationToken token)
        {
            return await Context.Users.FirstOrDefaultAsync(u => u.Email == email, token);
        }

        public async Task<bool> IsEmailAvailableAsync(string email, CancellationToken token)
        {
            return !await Context.Users.AnyAsync(u => u.Email == email, token);
        }

        public async Task<bool> IsEmailTakenAsync(string email, CancellationToken token)
        {
            return await Context.Users.AnyAsync(u => u.Email == email);
        }
    }
}
