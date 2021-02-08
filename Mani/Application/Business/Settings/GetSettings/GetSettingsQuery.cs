using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Settings.GetSettings
{
    public class GetSettingsQuery : IRequest<GetSettingsQueryVm> { }

    public class GetSettingsQueryHandler : IRequestHandler<GetSettingsQuery, GetSettingsQueryVm>
    {
        private ICurrentUserService CurrentUserService { get; }
        private ISettingsRepository SettingsRepository { get; }
        private IEntityMapper EntityMapper { get; }

        public GetSettingsQueryHandler(
            ICurrentUserService currentUserService,
            ISettingsRepository settingsRepository,
            IEntityMapper entityMapper)
        {
            CurrentUserService = currentUserService;
            SettingsRepository = settingsRepository;
            EntityMapper = entityMapper;
        }

        public async Task<GetSettingsQueryVm> Handle(GetSettingsQuery request, CancellationToken cancellationToken)
        {
            var userId = CurrentUserService.UserId.Value;
            var settings = await SettingsRepository.GetForUserAsync(userId, cancellationToken);
            return EntityMapper.Map<GetSettingsQueryVm>(settings);
        }
    }
}
