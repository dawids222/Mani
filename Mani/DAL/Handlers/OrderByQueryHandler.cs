using Application.Requests.Handlers;
using Application.Requests.Queries;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text;
namespace DAL.Handlers
{
    public class OrderByQueryHandler<T> : IOrderByQueryHandler<T>
    {
        public IQueryable<T> Sort(IQueryable<T> entities, IOrderByQuery query)
        {
            if (!entities.Any()) { return entities; }
            if (string.IsNullOrWhiteSpace(query.OrderBy)) { return entities; }
            var orderQuery = CreateOrderByQuery(query);
            return entities.OrderBy(orderQuery);
        }

        private string CreateOrderByQuery(IOrderByQuery query)
        {
            var orderParams = query.OrderBy.Trim().Split(',');
            var propertyInfos = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var orderQueryBuilder = new StringBuilder();
            foreach (var p in orderParams)
            {
                var param = p.Trim();
                if (string.IsNullOrWhiteSpace(param)) { continue; }
                var propertyFromQueryName = param.Split(" ")[0];
                var objectProperty = propertyInfos.FirstOrDefault(pi => pi.Name.Equals(propertyFromQueryName, StringComparison.InvariantCultureIgnoreCase));
                if (objectProperty == null) { continue; }
                var sortingOrder = param.EndsWith(" desc") ? "descending" : "ascending";
                orderQueryBuilder.Append($"{objectProperty.Name} {sortingOrder}, ");
            }
            return orderQueryBuilder.ToString().TrimEnd(',', ' ');
        }
    }
}