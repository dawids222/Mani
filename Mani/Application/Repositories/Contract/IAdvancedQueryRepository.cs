using Application.Requests.Queries;
using Application.Requests.Responses;
using Domain.Entities.Contract;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Repositories.Contract
{
    public interface IAdvancedQueryRepository<T> : IRepository<T> where T : class, IEntity
    {
        Task<PaginationVm<T>> GetAsync(IAdvancedQuery query, CancellationToken token);
    }
}
