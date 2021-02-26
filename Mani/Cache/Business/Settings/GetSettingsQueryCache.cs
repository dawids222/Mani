using Application.Business.Settings.EditSettings;
using Application.Business.Settings.GetSettings;
using Application.Common.Data;
using Cache.Contract;
using Microsoft.Extensions.Caching.Distributed;

namespace Cache.Business.Settings
{
    public class GetSettingsQueryCache : DistributedCache<GetSettingsQuery, GetSettingsQueryVm>
    {
        public GetSettingsQueryCache(
            IDistributedCache distributedCache,
            ICurrentUserService currentUserService)
            : base(distributedCache, currentUserService) { }

        protected override string GetCacheKeyIdentifier(GetSettingsQuery request)
        {
            return CurrentUserService.UserId.ToString();
        }
    }

    public class GetSettingsQueryCacheInvalidator : CacheInvalidator<EditSettingsCommand, GetSettingsQuery, GetSettingsQueryVm>
    {
        public GetSettingsQueryCacheInvalidator(
            ICache<GetSettingsQuery, GetSettingsQueryVm> cache,
            ICurrentUserService currentUserService)
            : base(cache, currentUserService) { }

        protected override string GetCacheKeyIdentifier(EditSettingsCommand request)
        {
            return CurrentUserService.UserId.ToString();
        }
    }
}
