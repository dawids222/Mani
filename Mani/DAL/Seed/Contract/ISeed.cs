using System.Threading.Tasks;

namespace DAL.Seed.Contract
{
    public interface ISeed
    {
        Task SeedAsync();
    }
}
