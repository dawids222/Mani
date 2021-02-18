using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Accounts.GetAccount
{
    public record GetAccountQuery(long Id) : IRequest<GetAccountQueryVm>;

    public record GetAccountQueryHandler(
            IAccountsRepository AccountsRepository,
            IEntityMapper EntityMapper
        ) : IRequestHandler<GetAccountQuery, GetAccountQueryVm>
    {
        public async Task<GetAccountQueryVm> Handle(GetAccountQuery request, CancellationToken cancellationToken)
        {
            var account = await AccountsRepository.GetAsync(request.Id, cancellationToken);
            return EntityMapper.MapTo<GetAccountQueryVm>(account);
        }
    }
}
