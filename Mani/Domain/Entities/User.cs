using Domain.Entities.Contract;
using Domain.Enums;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class User : IEntity
    {
        public long Id { get; set; }
        public UserType Type { get; set; } = UserType.USER;
        public string Email { get; set; }
        public string Password { get; set; }
        public Setting Settings { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Account> Accounts { get; set; }

        public User()
        {
            Categories = new HashSet<Category>();
            Accounts = new HashSet<Account>();
        }

        public User(string email, string password) : this()
        {
            Email = email;
            Password = password;
        }

        public User(string email, string password, Setting settings)
            : this(email, password)
        {
            Settings = settings;
        }

        public User(string email, string password, Setting settings, UserType type)
            : this(email, password, settings)
        {
            Type = type;
        }
    }
}
