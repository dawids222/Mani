using API.Extensions;
using API.Pipelines;
using API.Services;
using Application.Business.Users.GetUsersQuery;
using Application.Common.Data;
using Application.Common.Logging;
using Application.Common.Mapping;
using Application.Common.Resources.String;
using Application.Common.Security.Encryption;
using Application.Common.Security.JWT;
using Application.Repositories;
using Application.Requests.Handlers;
using Common.Logging;
using Common.Mapping;
using DAL;
using DAL.Handlers;
using DAL.Repositories;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Resources.String;
using System;

namespace API.Common
{
    internal static class DependencyInjection
    {
        internal static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ILogger, LogLiteLogger>();

            services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
            services.AddAuthorizersFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PipelineAuthorizationBehavior<,>));
            services.AddValidatorsFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PipelineValidationBehavior<,>));

            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("DatabaseConnection")));
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<ISettingsRepository, SettingsRepository>();
            services.AddTransient<IAccountsRepository, AccountsRepository>();

            services.AddTransient<ICurrentUserService, CurrentUserService>();

            services.AddTransient<IEncryptor, PBKDF2Encyptor>();
            services.AddTransient<IJwtService, JwtService>();

            services.AddTransient<IEntityMapper, MapsterEntityMapper>();

            services.AddTransient(typeof(IOrderByQueryHandler<>), typeof(OrderByQueryHandler<>));
            services.AddTransient(typeof(ISearchQueryHandler<>), typeof(SearchQueryHandler<>));
            services.AddTransient(typeof(IFilterQueryHandler<>), typeof(FilterQueryHandler<>));
            services.AddTransient(typeof(IPaginationQueryHandler<>), typeof(PaginationQueryHandler<>));
            services.AddTransient(typeof(IAdvancedQueryHandler<>), typeof(AdvancedQueryHandler<>));

            services.AddTransient<IStringResources>(provider =>
            {
                var httpContext = provider.GetRequiredService<IHttpContextAccessor>().HttpContext;
                var locale = httpContext.Request.Headers["Accept-Language"];
                var stringResourcesFactory = new StringResourcesFactory(locale);
                return stringResourcesFactory.GetStringResources();
            });
        }
    }
}
