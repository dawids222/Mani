using Application.Common.Mapping;
using Mapster;

namespace Common.Mapping
{
    public class MapsterEntityMapper : IEntityMapper
    {
        public T MapTo<T>(object sourceObject)
        {
            return sourceObject.Adapt<T>();
        }
    }
}
