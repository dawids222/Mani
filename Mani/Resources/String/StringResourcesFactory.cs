using Application.Common.Resources.String;
using Resources.String.Languages;

namespace Resources.String
{
    public class StringResourcesFactory : IStringResourcesFactory
    {
        private IStringResources Instance { get; set; }
        private string Locale { get; }

        public StringResourcesFactory(string locale)
        {
            Locale = locale;
        }

        public IStringResources GetStringResources()
        {
            if (Instance == null)
                Instance = CreateStringResources();
            return Instance;
        }

        private IStringResources CreateStringResources()
        {
            return Locale switch
            {
                "pl" => new PolishStringResources(),
                _ => new EnglishStringResources(),
            };
        }
    }
}
