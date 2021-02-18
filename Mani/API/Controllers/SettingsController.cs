﻿using API.Controllers.Contract;
using Application.Business.Settings.EditSettings;
using Application.Business.Settings.GetSettings;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : BaseController
    {
        public SettingsController(IMediator mediator) : base(mediator) { }

        [HttpGet]
        public async Task<GetSettingsQueryVm> Get(CancellationToken token)
        {
            var request = new GetSettingsQuery();
            return await Mediator.Send(request, token);
        }

        [HttpPut]
        public async Task Put(EditSettingsCommand request, CancellationToken token)
        {
            await Mediator.Send(request, token);
        }
    }
}
