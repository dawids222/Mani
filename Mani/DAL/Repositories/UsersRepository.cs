using Application.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private ApplicationDbContext Context { get; }

        public UsersRepository(ApplicationDbContext context)
        {
            Context = context;
        }

        public async Task<IEnumerable<User>> GetAsync(CancellationToken token)
        {
            return await Context.Users.ToListAsync(token);
        }

        public async Task<User> GetAsync(string email, CancellationToken token)
        {
            return await Context.Users.FirstOrDefaultAsync(u => u.Email == email, token);
        }

        public async Task AddAsync(User user, CancellationToken token)
        {
            await Context.Users.AddAsync(user, token);
        }

        public async Task<bool> IsEmailAvailableAsync(string email, CancellationToken token)
        {
            return !await Context.Users.AnyAsync(u => u.Email == email, token);
        }

        public async Task<bool> IsEmailTakenAsync(string email, CancellationToken token)
        {
            return await Context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task SaveAsync(CancellationToken token)
        {
            await Context.SaveChangesAsync(token);
        }
    }
}
