using Application.Repositories;
using Application.Requests.Handlers;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UsersRepository : AdvancedQueryRepository<User>, IUsersRepository
    {
        public UsersRepository(
            ApplicationDbContext context,
            IAdvancedQueryHandler<User> processor)
            : base(context, processor) { }

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
