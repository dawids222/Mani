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
using Cache.Business.Settings;
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
using Resources.String;
using System;

namespace API.Common
{
    internal static class DependencyInjection
    {
        internal static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMemoryCache(options => options.SizeLimit = 1024);
            services.AddDistributedMemoryCache(options => options.SizeLimit = 1024);
            services.AddHttpContextAccessor();
            services.AddSingleton<ILogger, LogLiteLogger>();

            services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
            services.AddAuthorizersFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddValidatorsFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddCachersFromAssembly(typeof(GetSettingsQueryCache).Assembly);
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(PipelineAuthorizationBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(PipelineValidationBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(PipelineCacheInvalidationBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(PipelineCacheBehovior<,>));

            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("DatabaseConnection")));
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<ISettingsRepository, SettingsRepository>();
            services.AddTransient<IAccountsRepository, AccountsRepository>();
            services.AddTransient<ICategoriesRepository, CategoriesRepository>();

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
