using Microsoft.Extensions.Caching.Distributed;
using Polenter.Serialization;
using System.IO;
using System.Threading.Tasks;

namespace Cache.Contract.Extensions
{
    internal static class DistributedCacheExtensions
    {
        public static Task SetAsync<T>(this IDistributedCache cache, string key, T value)
        {
            return SetAsync(cache, key, value, new DistributedCacheEntryOptions());
        }

        public static Task SetAsync<T>(
            this IDistributedCache cache,
            string key,
            T value,
            DistributedCacheEntryOptions options)
        {
            byte[] bytes;
            using (var memoryStream = new MemoryStream())
            {
                var serializer = new SharpSerializer(true);
                serializer.Serialize(value, memoryStream);
                bytes = memoryStream.ToArray();
            }

            return cache.SetAsync(key, bytes, options);
        }

        public static async Task<T> GetAsync<T>(this IDistributedCache cache, string key)
        {
            var val = await cache.GetAsync(key);
            var result = default(T);

            if (val == null) return result;

            using (var memoryStream = new MemoryStream(val))
            {
                var serializer = new SharpSerializer(true);
                result = (T)serializer.Deserialize(memoryStream);
            }

            return result;
        }

        public static async Task<(bool Found, T Value)> TryGetAsync<T>(this IDistributedCache cache, string key)
        {
            var cachedValue = await cache.GetAsync(key);
            T value;

            if (cachedValue == null)
            {
                return (false, default(T));
            }

            using (var memoryStream = new MemoryStream(cachedValue))
            {
                var serializer = new SharpSerializer(true);
                value = (T)serializer.Deserialize(memoryStream);
            }

            return (true, value);
        }
    }
}
