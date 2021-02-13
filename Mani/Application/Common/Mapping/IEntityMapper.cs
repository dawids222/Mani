namespace Application.Common.Mapping
{
    public interface IEntityMapper
    {
        T MapTo<T>(object sourceObject);
        void Copy(object destinationObject, object sourceObject);
    }
}
