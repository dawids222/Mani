namespace Application.Common.Mapping
{
    public interface IEntityMapper
    {
        T MapTo<T>(object sourceObject);
    }
}
