using Cache.Contract;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.Pipelines
{
    public class PipelineCacheInvalidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly IEnumerable<ICacheInvalidator<TRequest>> _cacheInvalidators;

        public PipelineCacheInvalidationBehavior(IEnumerable<ICacheInvalidator<TRequest>> cacheInvalidators)
        {
            _cacheInvalidators = cacheInvalidators;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            var result = await next();

            foreach (var invalidator in _cacheInvalidators)
            {
                await invalidator.Invalidate(request);
            }

            return result;
        }
    }
}
