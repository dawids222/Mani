﻿using Application.Authorization.Contract;
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

        public static void AddAuthorizersFromAssembly(
            this IServiceCollection services,
            Assembly assembly,
            ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            var authorizerType = typeof(IAuthorizer<>);
            assembly.GetTypesAssignableTo(authorizerType).ForEach(type =>
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
            var typeInfoList = assembly.DefinedTypes
                .Where(x =>
                    x.IsClass &&
                    !x.IsAbstract &&
                    x != compareType &&
                    x.GetInterfaces().Any(i =>
                        i.IsGenericType &&
                        i.GetGenericTypeDefinition() == compareType)
                )?.ToList();

            return typeInfoList;
        }
    }
}
