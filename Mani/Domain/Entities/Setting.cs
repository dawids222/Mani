using Domain.Entities.Contract;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Setting : IEntity
    {
        public long Id { get; set; }
        public string Currency { get; set; }
        [ForeignKey("User")]
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
    }
}
