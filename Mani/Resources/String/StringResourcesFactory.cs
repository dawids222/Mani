using Application.Common.Resources.String;
using Resources.String.Languages;

namespace Resources.String
{
    public class StringResourcesFactory : IStringResourcesFactory
    {
        private string Locale { get; }

        public StringResourcesFactory(string locale)
        {
            Locale = locale;
        }

        public IStringResources GetStringResources()
        {
            return Locale switch
            {
                "pl" => new PolishStringResources(),
                _ => new EnglishStringResources(),
            };
        }
    }
}
