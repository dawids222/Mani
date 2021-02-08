using Domain.Entities.Contract;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Account : IEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public ICollection<Transaction> OutboundTransactions { get; set; }
        public ICollection<Transaction> InboundTransactions { get; set; }
        public ICollection<Order> Orders { get; set; }

        public Account()
        {
            OutboundTransactions = new HashSet<Transaction>();
            InboundTransactions = new HashSet<Transaction>();
            Orders = new HashSet<Order>();
        }
    }
}
