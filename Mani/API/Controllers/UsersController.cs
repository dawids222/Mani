using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController
    {
        private IUsersRepository UsersRepository { get; }

        public UsersController(IUsersRepository usersRepository)
        {
            UsersRepository = usersRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> Get(CancellationToken token)
        {
            return await UsersRepository.Get();
        }
    }
}
