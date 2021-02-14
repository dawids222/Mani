using Application.Business.Accounts.AddAccount;
using Application.Business.Accounts.DeleteAccount;
using Application.Business.Accounts.EditAccount;
using Application.Business.Accounts.GetAccount;
using Application.Business.Accounts.GetAccounts;
using Application.Requests.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountsController
    {
        private IMediator Mediator { get; }

        public AccountsController(IMediator mediator)
        {
            Mediator = mediator;
        }

        [HttpGet]
        public async Task<GetAccountsQueryVm> Get([FromQuery] AdvancedQuery query, CancellationToken token)
        {
            var request = new GetAccountsQuery(query);
            return await Mediator.Send(request, token);
        }

        [HttpGet("{id}")]
        public async Task<GetAccountQueryVm> Get(long id, CancellationToken token)
        {
            var request = new GetAccountQuery(id);
            return await Mediator.Send(request, token);
        }

        [HttpPost]
        public async Task<AddAccountCommandVm> Post(AddAccountCommand request, CancellationToken token)
        {
            return await Mediator.Send(request, token);
        }

        [HttpPut]
        public async Task Put(EditAccountCommand request, CancellationToken token)
        {
            await Mediator.Send(request, token);
        }

        [HttpDelete("{id}")]
        public async Task Delete(long id, CancellationToken token)
        {
            var request = new DeleteAccountCommand(id);
            await Mediator.Send(request, token);
        }
    }
}
