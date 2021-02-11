using Application.Requests.Handlers;
using Application.Requests.Queries;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text;

namespace DAL.Handlers
{
    public class SearchQueryHandler<T> : ISearchQueryHandler<T>
    {
        public IQueryable<T> Search(IQueryable<T> entities, ISearchQuery query)
        {
            if (!entities.Any()) { return entities; }
            if (string.IsNullOrWhiteSpace(query.Search)) { return entities; }
            var searchQuery = CreateSearchQuery();
            return entities.Where(searchQuery, query.Search.ToLower());
        }

        private string CreateSearchQuery()
        {
            var properties = GetProperties();
            var stringBuilder = new StringBuilder();
            foreach (var property in properties)
            {
                stringBuilder.Append($"string(object({property.Name})).ToLower().Contains(@0) OR ");
            }
            var result = stringBuilder.ToString();
            return result.Substring(0, result.LastIndexOf("OR "));
        }
        private IEnumerable<PropertyInfo> GetProperties()
        {
            return typeof(T)
                .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Where(p =>
                    p.PropertyType == typeof(int) ||
                    p.PropertyType == typeof(long) ||
                    p.PropertyType == typeof(bool) ||
                    p.PropertyType == typeof(string));
        }
    }
}
