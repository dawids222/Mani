using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Configuration
{
    public class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Name).IsRequired().HasMaxLength(255);
            builder.Property(a => a.Logo).IsRequired().HasMaxLength(255);
            builder.Property(a => a.Color).IsRequired().HasMaxLength(7);
            builder.Property(a => a.Description).HasMaxLength(255);
            builder.Ignore(a => a.Balance);
            builder
                .HasMany(a => a.OutboundTransactions)
                .WithOne(t => t.Account)
                .HasForeignKey(t => t.AccountId)
                .IsRequired();
            builder
                .HasMany(a => a.InboundTransactions)
                .WithOne(t => t.TargetAccount)
                .HasForeignKey(t => t.TargetAccountId);
            builder
                .HasMany(a => a.Orders)
                .WithOne(o => o.Account)
                .HasForeignKey(o => o.AccountId)
                .IsRequired();
        }
    }
}
