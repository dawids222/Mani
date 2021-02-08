using Application.Repositories;
using Domain.Entities.Contract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public abstract class Repository<T> : IRepository<T>
        where T : class, IEntity
    {
        protected ApplicationDbContext Context { get; }

        protected Repository(ApplicationDbContext context)
        {
            Context = context;
        }

        public async Task AddAsync(T entity, CancellationToken token)
        {
            await Context.Set<T>().AddAsync(entity, token);
        }

        public async Task<bool> ExistsAsync(long id, CancellationToken token)
        {
            return await Context.Set<T>().AnyAsync(e => e.Id == id, token);
        }

        public async Task<IEnumerable<T>> GetAsync(CancellationToken token)
        {
            return await Context.Set<T>().ToListAsync(token);
        }

        public async Task<T> GetAsync(long id, CancellationToken token)
        {
            return await Context.Set<T>().FirstOrDefaultAsync(e => e.Id == id, token);
        }

        public async Task RemoveAsync(long id, CancellationToken token)
        {
            var dbSet = Context.Set<T>();
            var entity = await dbSet.FirstOrDefaultAsync(e => e.Id == id, token);
            dbSet.Remove(entity);
        }

        public async Task RemoveAsync(T entity, CancellationToken token)
        {
            Context.Set<T>().Remove(entity);
        }

        public async Task SaveAsync(CancellationToken token)
        {
            await Context.SaveChangesAsync(token);
        }
    }
}
