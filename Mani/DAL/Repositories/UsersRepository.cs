using Application.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public async Task<IEnumerable<User>> Get()
        {
            return await Context.Users.ToListAsync();
        }
    }
}
