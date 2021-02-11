using Application.Requests.Handlers;
using Application.Requests.Queries;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text;

namespace DAL.Handlers
{
    public class FilterQueryHandler<T> : IFilterQueryHandler<T>
    {
        private readonly static string[] CONTAIN_SYNONYMS = {
            "contain",
            "contains",
            "like"
        };

        public IQueryable<T> Filter(IQueryable<T> entities, IFilterQuery query)
        {
            if (!entities.Any()) { return entities; }
            if (string.IsNullOrWhiteSpace(query.Filter)) { return entities; }
            var filterQuery = CreateFilterQuery(query);
            return entities.Where(filterQuery);
        }

        private string CreateFilterQuery(IFilterQuery query)
        {
            var filterParams = query.Filter.Trim().Split(',');
            var propertyInfos = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var filterQueryBuilder = new StringBuilder();
            foreach (var p in filterParams)
            {
                var param = p.Trim();
                if (string.IsNullOrWhiteSpace(param)) { continue; }
                var paramSplited = param.Split(" ");
                if (paramSplited.Length < 3) { continue; }
                var propertyFromQueryName = paramSplited[0];
                var objectProperty = propertyInfos.FirstOrDefault(pi => pi.Name.Equals(propertyFromQueryName, StringComparison.InvariantCultureIgnoreCase));
                var operrand = paramSplited[1];
                var value = string.Join(" ", paramSplited.Skip(2)).ToLower();
                if (objectProperty == null) { continue; }
                var stringQuery = IsContainsOpperand(operrand)
                    ? $"string(object({objectProperty.Name})).ToLower().Contains(\"{value}\") AND "
                    : $"string(object({objectProperty.Name})).ToLower() {operrand} \"{value}\" AND ";
                filterQueryBuilder.Append(stringQuery);
            }
            var result = filterQueryBuilder.ToString();
            return result.Substring(0, result.LastIndexOf("AND "));
        }

        private bool IsContainsOpperand(string operrand)
        {
            var lowerOperrand = operrand.ToLower();
            return CONTAIN_SYNONYMS.Contains(lowerOperrand);
        }
    }
}
