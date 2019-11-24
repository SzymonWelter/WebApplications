using System;

namespace Server.Services.Configuration
{
    public interface IConfigurationService
    {
        DateTime GetTokenExpiration();
        string GetSecret();
        string GetBlobConnectionString();
    }
}