using Application.Common.Logging;
using Application.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace API.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private ILogger Logger { get; }

        public ApiExceptionFilter(ILogger logger)
        {
            Logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            Exception apiError = null;
            if (context.Exception is CustomValidationException)
            {
                apiError = context.Exception as CustomValidationException;
                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                Logger.Warning(apiError.Message);
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                apiError = context.Exception as UnauthorizedAccessException;
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                Logger.Warning(apiError.Message);
            }
            else if (context.Exception is CustomUnauthorizedException)
            {
                apiError = context.Exception as CustomUnauthorizedException;
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                Logger.Warning(apiError.Message);
            }
            else
            {
                context.HttpContext.Response.StatusCode = 500;
                Logger.Error(apiError.Message);
            }

            context.Result = new JsonResult(apiError?.Message ?? context.Exception.Message);
            base.OnException(context);
        }
    }
}
