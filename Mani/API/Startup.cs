using API.Common;
using API.Extensions;
using API.Filters;
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
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Resources.String;
using System;
using System.Text;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(options =>
            {
                options.Filters.Add<ApiExceptionFilter>();
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            var key = Encoding.ASCII.GetBytes(Settings.JWT_SECRET);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ILogger, LogLiteLogger>();

            services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
            services.AddValidatorsFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PipelineValidationBehavior<,>));
            services.AddAuthorizersFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PipelineAuthorizationBehavior<,>));

            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DatabaseConnection")));
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

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
