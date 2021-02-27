using Application.Authorization.Contract;
using Cache.Contract;
using DAL.Seed.Contract;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace API.Extensions
{
    public static class StartupExtensions
    {
        public static void AddValidatorsFromAssembly(
            this IServiceCollection services,
            Assembly assembly)
        {
            AssemblyScanner.FindValidatorsInAssembly(assembly)
                .ForEach(item => services.AddTransient(item.InterfaceType, item.ValidatorType));
        }

        public static void AddCachersFromAssembly(
            this IServiceCollection services,
            Assembly assembly,
            ServiceLifetime lifetime = ServiceLifetime.Scoped)
        {
            var cacheType = typeof(ICache<,>);
            RegisterTypesAssignableTo(cacheType, services, assembly, lifetime);

            var cacheInvalidatorType = typeof(ICacheInvalidator<>);
            RegisterTypesAssignableTo(cacheInvalidatorType, services, assembly, lifetime);
        }

        public static void AddAuthorizersFromAssembly(
            this IServiceCollection services,
            Assembly assembly,
            ServiceLifetime lifetime = ServiceLifetime.Scoped)
        {
            var authorizerType = typeof(IAuthorizer<>);
            RegisterTypesAssignableTo(authorizerType, services, assembly, lifetime);
        }

        public static void AddSeedsFromAssembly(
            this IServiceCollection services,
            Assembly assembly)
        {
            var seedType = typeof(ISeed);
            RegisterTypesAssignableTo(seedType, services, assembly, ServiceLifetime.Scoped, false);
        }

        private static void RegisterTypesAssignableTo(
            Type type,
            IServiceCollection services,
            Assembly assembly,
            ServiceLifetime lifetime,
            bool isGeneric = true)
        {
            (isGeneric
                ? assembly.GetGenericTypesAssignableTo(type)
                : assembly.GetTypesAssignableTo(type))
            .ForEach(type =>
            {
                foreach (var implementedInterface in type.ImplementedInterfaces)
                    switch (lifetime)
                    {
                        case ServiceLifetime.Scoped:
                            services.AddScoped(implementedInterface, type);
                            break;
                        case ServiceLifetime.Singleton:
                            services.AddSingleton(implementedInterface, type);
                            break;
                        case ServiceLifetime.Transient:
                            services.AddTransient(implementedInterface, type);
                            break;
                    }
            });
        }

        private static List<TypeInfo> GetTypesAssignableTo(this Assembly assembly, Type compareType)
        {
            return assembly.DefinedTypes
                .Where(x =>
                    x.IsClass &&
                    !x.IsAbstract &&
                    x != compareType &&
                    x.GetInterfaces()
                        .Any(i => compareType.IsAssignableFrom(i))
                )
                .ToList();
        }

        private static List<TypeInfo> GetGenericTypesAssignableTo(this Assembly assembly, Type compareType)
        {
            return assembly.DefinedTypes
                .Where(x =>
                    x.IsClass &&
                    !x.IsAbstract &&
                    x != compareType &&
                    x.GetInterfaces().Any(i =>
                        i.IsGenericType &&
                        i.GetGenericTypeDefinition() == compareType)
                )?.ToList();
        }
    }
}
