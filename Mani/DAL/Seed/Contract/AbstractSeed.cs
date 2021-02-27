using System.Threading.Tasks;

namespace DAL.Seed.Contract
{
    public abstract class AbstractSeed : ISeed
    {
        protected ApplicationDbContext Context { get; }

        public AbstractSeed(ApplicationDbContext context)
        {
            Context = context;
        }

        public abstract Task SeedAsync();
    }
}
