using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Settings.GetSettings
{
    public class GetSettingsQuery : IRequest<GetSettingsQueryVm> { }

    public record GetSettingsQueryHandler(
            ICurrentUserService CurrentUserService,
            ISettingsRepository SettingsRepository,
            IEntityMapper EntityMapper
        ) : IRequestHandler<GetSettingsQuery, GetSettingsQueryVm>
    {
        public async Task<GetSettingsQueryVm> Handle(GetSettingsQuery request, CancellationToken cancellationToken)
        {
            var userId = CurrentUserService.UserId.Value;
            var settings = await SettingsRepository.GetForUserAsync(userId, cancellationToken);
            return EntityMapper.MapTo<GetSettingsQueryVm>(settings);
        }
    }
}
