using Application.Requests.Responses;
using System.Collections.Generic;

namespace Application.Business.Categories.GetCategories
{
    public class GetCategoriesQueryVm : PaginationVm<GetCategoriesVmListItem>
    {
        public GetCategoriesQueryVm(
            IEnumerable<GetCategoriesVmListItem> items,
            int allItemsCount) : base(items, allItemsCount) { }
    }

    public class GetCategoriesVmListItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }
}
