using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Server.Models.Domain;
using Server.Services.Configuration;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<string[]> GetFilesNames(string login)
        {
            var cloudBlobContainer = _blobClient.GetContainerReference(login);
            BlobResultSegment segment = await cloudBlobContainer.ListBlobsSegmentedAsync(null);
            List<IListBlobItem> list = new List<IListBlobItem>();
            list.AddRange(segment.Results);
            while (segment.ContinuationToken != null)
            {
                segment = await _blobClient.ListBlobsSegmentedAsync(login, segment.ContinuationToken);
                list.AddRange(segment.Results);
            }
            return list.OfType<CloudBlockBlob>().Select(b => b.Name).ToArray();
        }
    }
}
