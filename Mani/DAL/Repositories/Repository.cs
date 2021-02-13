using Application.Repositories.Contract;
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

        public virtual async Task AddAsync(T entity, CancellationToken token)
        {
            await Task.Delay(0, token);
            Context.Set<T>().Add(entity);
        }

        public virtual async Task<bool> ExistsAsync(long id, CancellationToken token)
        {
            return await Context.Set<T>().AnyAsync(e => e.Id == id, token);
        }

        public virtual async Task<IEnumerable<T>> GetAsync(CancellationToken token)
        {
            return await Context.Set<T>().ToListAsync(token);
        }

        public virtual async Task<T> GetAsync(long id, CancellationToken token)
        {
            return await Context.Set<T>().FirstOrDefaultAsync(e => e.Id == id, token);
        }

        public virtual async Task RemoveAsync(long id, CancellationToken token)
        {
            var dbSet = Context.Set<T>();
            var entity = await dbSet.FirstOrDefaultAsync(e => e.Id == id, token);
            dbSet.Remove(entity);
        }

        public virtual async Task RemoveAsync(T entity, CancellationToken token)
        {
            await Task.Delay(0, token);
            Context.Set<T>().Remove(entity);
        }

        public virtual async Task SaveAsync(CancellationToken token)
        {
            await Context.SaveChangesAsync(token);
        }
    }
}
