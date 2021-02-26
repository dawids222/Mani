using Application.Common.Data;
using MediatR;
using System.Threading.Tasks;

namespace Cache.Contract
{
    public abstract class
        CacheInvalidator<TRequest, TCachedRequest, TCachedResponse> : ICacheInvalidator<TRequest>
        where TCachedRequest : IRequest<TCachedResponse>
    {
        private readonly ICache<TCachedRequest, TCachedResponse> _cache;
        protected ICurrentUserService CurrentUserService { get; }

        protected CacheInvalidator(
            ICache<TCachedRequest, TCachedResponse> cache,
            ICurrentUserService currentUserService)
        {
            _cache = cache;
            CurrentUserService = currentUserService;
        }

        protected abstract string GetCacheKeyIdentifier(TRequest request);

        public async Task Invalidate(TRequest request)
        {
            await _cache.Remove(GetCacheKeyIdentifier(request));
        }
    }
}
