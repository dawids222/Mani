using DAL.Seed.Contract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Seed
{
    public class Seeder
    {
        private ApplicationDbContext _context;
        private IEnumerable<ISeed> _seeds;

        public Seeder(
            ApplicationDbContext context,
            IEnumerable<ISeed> seeds)
        {
            _context = context;
            _seeds = seeds;
        }

        public async Task SeedAsync()
        {
            foreach (var seed in _seeds)
                await seed.SeedAsync();

            await _context.SaveChangesAsync();
        }
    }
}
