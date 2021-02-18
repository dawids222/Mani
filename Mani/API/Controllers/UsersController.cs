﻿using API.Controllers.Contract;
using Application.Business.Users.GetUsersQuery;
using Application.Requests.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        public UsersController(IMediator mediator) : base(mediator) { }

        [HttpGet]
        public async Task<GetUsersQueryVm> Get([FromQuery] AdvancedQuery query, CancellationToken token)
        {
            return await Mediator.Send(new GetUsersQuery(query), token);
        }
    }
}
