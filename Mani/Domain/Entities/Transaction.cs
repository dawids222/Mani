using Domain.Entities.Contract;
using Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Transaction : IEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public TransactionType Type { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }
        public bool IsActive { get; set; }
        [ForeignKey("Account")]
        public long AccountId { get; set; }
        public Account Account { get; set; }
        [ForeignKey("TargetAccount")]
        public long? TargetAccountId { get; set; }
        public Account TargetAccount { get; set; }
        [ForeignKey("Category")]
        public long? CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
