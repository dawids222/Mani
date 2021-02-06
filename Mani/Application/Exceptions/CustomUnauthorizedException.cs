using System;
using System.Runtime.Serialization;

namespace Application.Exceptions
{
    public class CustomUnauthorizedException : Exception
    {
        public CustomUnauthorizedException()
        {
        }

        public CustomUnauthorizedException(string message) : base(message)
        {
        }

        public CustomUnauthorizedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected CustomUnauthorizedException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
