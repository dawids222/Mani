using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(255);
            builder.Property(u => u.Type).IsRequired().HasDefaultValue(UserType.USER);
            builder
                .HasOne(u => u.Settings)
                .WithOne(s => s.User)
                .HasForeignKey<Setting>(s => s.UserId)
                .IsRequired();
            builder
                .HasMany(u => u.Categories)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .IsRequired();
            builder
                .HasMany(u => u.Accounts)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId)
                .IsRequired();
        }
    }
}
