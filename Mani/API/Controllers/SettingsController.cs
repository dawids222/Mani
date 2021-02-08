using Application.Business.Settings.GetSettings;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController
    {
        private IMediator Mediator { get; }

        public SettingsController(IMediator mediator)
        {
            Mediator = mediator;
        }

        [HttpGet]
        public async Task<GetSettingsQueryVm> Get(CancellationToken token)
        {
            var request = new GetSettingsQuery();
            return await Mediator.Send(request, token);
        }
    }
}
