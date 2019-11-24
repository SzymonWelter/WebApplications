using System;
using Microsoft.Extensions.Configuration;

namespace Server.Services.Configuration
{
    internal class ConfigurationService : IConfigurationService
    {
        private readonly IConfiguration _configuration;

        public ConfigurationService(IConfiguration configuration)
        {
           _configuration = configuration;
        }

        public string GetBlobConnectionString()
        {
            return _configuration["BlobStorage:ConnectionString"];
        }

        public string GetSecret()
        {
            return _configuration["Authorization:Secret"];
        }

        public DateTime GetTokenExpiration()
        {
            var offset = int.Parse(_configuration["Authorization:TokenExpiration"]);
            return DateTime.UtcNow.AddMinutes(offset);
        }
    }
}