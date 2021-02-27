using Application.Common.Security.Encryption;
using DAL.Seed.Contract;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DAL.Seed
{
    public class UsersSeed : AbstractSeed, ISeed
    {
        private IEncryptor Encryptor { get; }

        public UsersSeed(
            ApplicationDbContext context,
            IEncryptor encryptor) : base(context)
        {
            Encryptor = encryptor;
        }

        public override async Task SeedAsync()
        {
            var admin = new User(
                "admin@admin.com",
                "_ab$F|Ru)H?XGx+4#NsW;g_X'ueYq)s,",
                new Setting(),
                UserType.ADMIN
            );
            var dbAdmin = await Context.Users.FirstOrDefaultAsync(u => u.Email == admin.Email);
            if (dbAdmin is null)
            {
                Context.Users.Add(admin);
            }
            else if (isNotAdmin(dbAdmin) || haveDifferentPasswords(dbAdmin, admin))
            {
                Context.Users.Remove(dbAdmin);
                admin.Password = Encryptor.Encrypt(admin.Password);
                Context.Users.Add(admin);
            }
        }

        private bool isNotAdmin(User user) => user.Type != UserType.ADMIN;
        private bool haveDifferentPasswords(User dbUser, User user) => !Encryptor.Match(dbUser.Password, user.Password);

    }
}
