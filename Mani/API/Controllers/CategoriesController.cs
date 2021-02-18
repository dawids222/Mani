using API.Controllers.Contract;
using Application.Business.Categories.GetCategory;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : BaseController
    {
        public CategoriesController(IMediator mediator) : base(mediator) { }

        [HttpGet("{id}")]
        public async Task<GetCategoryQueryVm> Get(long id, CancellationToken token)
        {
            var request = new GetCategoryQuery(id);
            return await Mediator.Send(request, token);
        }

    }
}
