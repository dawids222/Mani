using Domain.Entities.Contract;
using Domain.Enums;
using System;

namespace Domain.Entities
{
    public class Transaction : IEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public TransactionType Type { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }
        public long AccountId { get; set; }
        public Account Account { get; set; }
        public long? TargetAccountId { get; set; }
        public Account TargetAccount { get; set; }
        public long? CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
