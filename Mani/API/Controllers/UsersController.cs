using Application.Business.Users.GetUsersQuery;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController
    {
        private IMediator Mediator { get; }

        public UsersController(IMediator mediator)
        {
            Mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public async Task<GetUsersQueryVm> Get(CancellationToken token)
        {
            return await Mediator.Send(new GetUsersQuery(), token);
        }
    }
}
