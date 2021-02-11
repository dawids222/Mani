using System.Collections.Generic;

namespace Application.Requests.Responses
{
    public class PaginationVm<T>
    {
        public IEnumerable<T> Items { get; }
        public int AllItemsCount { get; }

        public PaginationVm(IEnumerable<T> items, int allItemsCount)
        {
            Items = items;
            AllItemsCount = allItemsCount;
        }
    }
}
