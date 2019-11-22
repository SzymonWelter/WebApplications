using System;

namespace server.Services.ConfigurationService
{
    public interface IConfigurationService
    {
        DateTime GetTokenExpiration();
        string GetSecret();
    }
}