using Application.Repositories;
using Application.Requests.Handlers;
using Application.Requests.Queries;
using Application.Requests.Responses;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class AccountsRepository : AdvancedQueryRepository<Account>, IAccountsRepository
    {
        private IQueryable<Account> AccountItems =>
            Context.Accounts
                .Include(a => a.InboundTransactions)
                .Include(a => a.OutboundTransactions)
                .Select(a => new Account()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Balance =
                        a.InboundTransactions.Sum(it => it.Value) -
                        a.OutboundTransactions.Sum(ot => ot.Value),
                    Logo = a.Logo,
                    Color = a.Color,
                    Description = a.Description,
                    UserId = a.UserId,
                });

        public AccountsRepository(
            ApplicationDbContext context,
            IAdvancedQueryHandler<Account> handler)
            : base(context, handler) { }

        public override async Task<PaginationVm<Account>> GetAsync(IAdvancedQuery query, CancellationToken token)
        {
            var items = AccountItems;
            var processedItems = await AdvancedQueryHandler
                .Process(items, query)
                .ToListAsync(token);
            return new PaginationVm<Account>(processedItems, AdvancedQueryHandler.AllItemsCount);
        }

        public async Task<PaginationVm<Account>> GetAsync(long userId, IAdvancedQuery query, CancellationToken token)
        {
            var items = AccountItems.Where(a => a.UserId == userId);
            var processedItems = await AdvancedQueryHandler
                .Process(items, query)
                .ToListAsync(token);
            return new PaginationVm<Account>(processedItems, AdvancedQueryHandler.AllItemsCount);
        }

        public override async Task<IEnumerable<Account>> GetAsync(CancellationToken token)
        {
            return await AccountItems.ToListAsync(token);
        }

        public override async Task<Account> GetAsync(long id, CancellationToken token)
        {
            return await AccountItems.FirstOrDefaultAsync(a => a.Id == id, token);
        }
    }
}
