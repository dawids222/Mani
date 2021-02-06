using Application.Authorization.Contract;
using Application.Exceptions;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Pipelines
{
    public class PipelineAuthorizationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private IEnumerable<IAuthorizer<TRequest>> Authorizers { get; }
        private IMediator Mediator { get; }

        public PipelineAuthorizationBehavior(
            IEnumerable<IAuthorizer<TRequest>> authorizers,
            IMediator mediator)
        {
            Authorizers = authorizers;
            Mediator = mediator;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var requirements = new List<IAuthorizationRequirement>();

            foreach (var authorizer in Authorizers)
            {
                authorizer.BuildPolicy(request);
                requirements.AddRange(authorizer.Requirements);
            }

            foreach (var requirement in requirements.Distinct())
            {
                AuthorizationResult result = await Mediator.Send(requirement, cancellationToken);
                if (!result.IsAuthorized)
                    throw new CustomUnauthorizedException(result.FailureMessage);
            }

            return await next();
        }
    }
}
