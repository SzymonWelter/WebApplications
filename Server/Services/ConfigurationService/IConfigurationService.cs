using System;

namespace Server.Services.ConfigurationService
{
    public interface IConfigurationService
    {
        DateTime GetTokenExpiration();
        string GetSecret();
    }
}