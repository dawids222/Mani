using API.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace API.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            Exception apiError = null;
            if (context.Exception is CustomValidationException)
            {
                apiError = context.Exception as CustomValidationException;
                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                apiError = context.Exception as UnauthorizedAccessException;
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }
            else
            {
                context.HttpContext.Response.StatusCode = 500;
            }

            context.Result = new JsonResult(apiError?.Message ?? context.Exception.Message);
            base.OnException(context);
        }
    }
}
