using Domain.Entities.Contract;

namespace Domain.Entities
{
    public class Setting : IEntity
    {
        public long Id { get; set; }
        public string Currency { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }

        public Setting()
        {
            InitDefaultValues();
        }

        private void InitDefaultValues()
        {
            Currency = "PLN";
        }

        public const int CURRENCY_MAX_LENGTH = 5;
    }
}
