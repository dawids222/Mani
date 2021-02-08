using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Name).IsRequired().HasMaxLength(255);
            builder.Property(c => c.Logo).IsRequired().HasMaxLength(255);
            builder.Property(c => c.Color).IsRequired().HasMaxLength(7);
            builder.Property(c => c.Description).HasMaxLength(255);
            builder
                .HasMany(c => c.Transactions)
                .WithOne(t => t.Category)
                .HasForeignKey(t => t.CategoryId);
            builder
                .HasMany(c => c.Orders)
                .WithOne(o => o.Category)
                .HasForeignKey(o => o.CategoryId);
        }
    }
}
