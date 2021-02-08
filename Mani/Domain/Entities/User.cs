using Domain.Entities.Contract;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class User : IEntity
    {
        [Key]
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Setting Settings { get; set; }

        public User()
        {

        }

        public User(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public User(string email, string password, Setting settings)
        {
            Email = email;
            Password = password;
            Settings = settings;
        }
    }
}
