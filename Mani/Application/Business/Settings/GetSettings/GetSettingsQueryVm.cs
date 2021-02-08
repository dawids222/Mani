namespace Application.Business.Settings.GetSettings
{
    public class GetSettingsQueryVm
    {
        public string Currency { get; set; }

        public GetSettingsQueryVm(string currency)
        {
            Currency = currency;
        }
    }
}
