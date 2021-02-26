using Application.Common.Data;
using Cache.Contract.Extensions;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Threading.Tasks;

namespace Cache.Contract
{
    public abstract class DistributedCache<TRequest, TResponse> : ICache<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private IDistributedCache _distributedCache;
        protected ICurrentUserService CurrentUserService { get; }

        protected virtual DateTime? AbsoluteExpiration { get; }
        protected virtual TimeSpan? AbsoluteExpirationRelativeToNow { get; }
        protected virtual TimeSpan? SlidingExpiration { get; } = TimeSpan.FromMinutes(10);

        protected DistributedCache(
            IDistributedCache distributedCache,
            ICurrentUserService currentUserService)
        {
            _distributedCache = distributedCache;
            CurrentUserService = currentUserService;
        }
        protected abstract string GetCacheKeyIdentifier(TRequest request);

        private static string GetCacheKey(string id)
        {
            return $"{typeof(TRequest).FullName}:{id}";
        }

        private string GetCacheKey(TRequest request)
        {
            return GetCacheKey(GetCacheKeyIdentifier(request));
        }

        public virtual async Task<TResponse> Get(TRequest request)
        {
            var response = await _distributedCache.GetAsync<TResponse>(GetCacheKey(request));
            return response == null ? default : response;
        }

        public virtual async Task Set(TRequest request, TResponse value)
        {
            await _distributedCache.SetAsync(
                GetCacheKey(request),
                value,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpiration = AbsoluteExpiration,
                    AbsoluteExpirationRelativeToNow = AbsoluteExpirationRelativeToNow,
                    SlidingExpiration = SlidingExpiration
                });
        }
        public async Task Remove(string cacheKeyIdentifier)
        {
            await _distributedCache.RemoveAsync(GetCacheKey(cacheKeyIdentifier));
        }
    }
}