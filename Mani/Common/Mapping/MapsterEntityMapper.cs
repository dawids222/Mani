using Application.Common.Mapping;
using Mapster;
using System.Linq;
using System.Reflection;

namespace Common.Mapping
{
    public class MapsterEntityMapper : IEntityMapper
    {
        public T MapTo<T>(object sourceObject)
        {
            return sourceObject.Adapt<T>();
        }

        public void Copy(object destinationObject, object sourceObject)
        {
            var typeDest = destinationObject.GetType();
            var typeSrc = sourceObject.GetType();

            var results = from sourceProperty in typeSrc.GetProperties()
                          let targetProperty = typeDest.GetProperty(sourceProperty.Name)
                          where sourceProperty.CanRead
                          && targetProperty != null
                          && (targetProperty.GetSetMethod(true) != null
                          && !targetProperty.GetSetMethod(true).IsPrivate)
                          && (targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) == 0
                          && targetProperty.PropertyType.IsAssignableFrom(sourceProperty.PropertyType)
                          select new { sourceProperty, targetProperty };

            foreach (var props in results)
            {
                props.targetProperty.SetValue(destinationObject, props.sourceProperty.GetValue(sourceObject, null), null);
            }
        }
    }
}
