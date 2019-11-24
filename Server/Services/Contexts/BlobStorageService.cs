using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Server.Models.Domain;
using Server.Services.Configuration;
using System.Threading.Tasks;

namespace Server.Services.Contexts
{
    internal class BlobStorageService : IBlobStorageService
    {
        private readonly CloudBlobClient _blobClient;
        public BlobStorageService(IConfigurationService configurationService)
        {
            var connectionString = configurationService.GetBlobConnectionString();
            var blobStorageAccount = CloudStorageAccount.Parse(connectionString);
            _blobClient = blobStorageAccount.CreateCloudBlobClient();
        }

        public async Task CreateBlob(UserFileModel userFile)
        {
            var cloudBlobContainer = _blobClient.GetContainerReference(userFile.Login);
            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            }

            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(userFile.FileName);

            cloudBlockBlob.Properties.ContentType = userFile.ContentType;

            await cloudBlockBlob.UploadFromStreamAsync(userFile.File);

        }
    }
}
