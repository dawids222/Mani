using API.Controllers.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : BaseController
    {
        public CategoriesController(IMediator mediator) : base(mediator) { }
    }
}
