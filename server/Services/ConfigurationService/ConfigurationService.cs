using System;
using Microsoft.Extensions.Configuration;

namespace Server.Services.ConfigurationService
{
    internal class ConfigurationService : IConfigurationService
    {
        private readonly IConfiguration configuration;

        public ConfigurationService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string GetSecret()
        {
            return configuration["Authorization:Secret"];
        }

        public DateTime GetTokenExpiration()
        {
            var offset = int.Parse(configuration["Authorization:TokenExpiration"]);
            return DateTime.UtcNow.AddMinutes(offset);
        }
    }
}