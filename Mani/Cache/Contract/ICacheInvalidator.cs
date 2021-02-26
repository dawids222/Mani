using System.Threading.Tasks;

namespace Cache.Contract
{
    public interface ICacheInvalidator<in TRequest>
    {
        Task Invalidate(TRequest request);
    }
}
