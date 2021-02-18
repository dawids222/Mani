using MediatR;

namespace API.Controllers.Contract
{
    public class BaseController
    {
        protected IMediator Mediator { get; }

        public BaseController(IMediator mediator)
        {
            Mediator = mediator;
        }
    }
}
