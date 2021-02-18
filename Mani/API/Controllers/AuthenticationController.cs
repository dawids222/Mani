using API.Controllers.Contract;
using Application.Business.Authentication.Login;
using Application.Business.Authentication.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : BaseController
    {
        public AuthenticationController(IMediator mediator) : base(mediator) { }

        [HttpPost("register")]
        public async Task<RegisterCommandVm> Register(RegisterCommand request, CancellationToken token)
        {
            return await Mediator.Send(request, token);
        }

        [HttpPost("login")]
        public async Task<LoginCommandVm> Login(LoginCommand request, CancellationToken token)
        {
            return await Mediator.Send(request, token);
        }
    }
}
