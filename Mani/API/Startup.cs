using API.Common;
using API.Extensions;
using API.Filters;
using API.Pipelines;
using API.Services;
using Application.Business.Users.GetUsersQuery;
using Application.Common.Data;
using Application.Common.Security.Encryption;
using Application.Common.Security.JWT;
using Application.Repositories;
using DAL;
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
                options.Filters.Add(new ApiExceptionFilter());
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

            services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
            services.AddValidatorsFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PipelineValidationBehavior<,>));
            services.AddAuthorizersFromAssembly(typeof(GetUsersQuery).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PipelineAuthorizationBehavior<,>));

            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DatabaseConnection")));
            services.AddTransient<IUsersRepository, UsersRepository>();

            services.AddTransient<ICurrentUserService, CurrentUserService>();

            services.AddTransient<IEncryptor, PBKDF2Encyptor>();
            services.AddTransient<IJwtService, JwtService>();
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
