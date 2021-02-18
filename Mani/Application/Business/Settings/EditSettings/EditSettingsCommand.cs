using Application.Common.Data;
using Application.Common.Mapping;
using Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Business.Settings.EditSettings
{
    public class EditSettingsCommand : IRequest
    {
        public string Currency { get; set; }
    }

    public record EditSettingsCommandHandler(
            ISettingsRepository SettingsRepository,
            ICurrentUserService CurrentUserService,
            IEntityMapper EntityMapper
        ) : IRequestHandler<EditSettingsCommand>
    {
        public async Task<Unit> Handle(EditSettingsCommand request, CancellationToken cancellationToken)
        {
            var userId = CurrentUserService.UserId.Value;
            var settings = await SettingsRepository.GetForUserAsync(userId, cancellationToken);
            EntityMapper.Copy(settings, request);
            await SettingsRepository.SaveAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
