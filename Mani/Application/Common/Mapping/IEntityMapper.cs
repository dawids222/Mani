namespace Application.Common.Mapping
{
    public interface IEntityMapper
    {
        T Map<T>(object sourceObject);
    }
}
