using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Name).HasMaxLength(255);
            builder.Property(o => o.Type).IsRequired();
            builder.Property(o => o.Value).IsRequired();
            builder.Property(o => o.IsActive).IsRequired().HasDefaultValue(true);
        }
    }
}
