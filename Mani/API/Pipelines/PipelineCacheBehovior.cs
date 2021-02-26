using Cache.Contract;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Pipelines
{
    public class PipelineCacheBehovior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<ICache<TRequest, TResponse>> _cachedRequests;

        public PipelineCacheBehovior(IEnumerable<ICache<TRequest, TResponse>> cachedRequests)
        {
            _cachedRequests = cachedRequests;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            var cacheRequest = _cachedRequests.FirstOrDefault();
            if (cacheRequest is null)
            {
                return await next();
            }

            var cachedResult = await cacheRequest.Get(request);

            if (cachedResult is not null)
            {
                return cachedResult;
            }

            var result = await next();
            await cacheRequest.Set(request, result);
            return result;
        }
    }
}
