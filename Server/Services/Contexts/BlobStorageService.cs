using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Server.Models.Domain;
using Server.Services.Configuration;
using System.Collections.Generic;
using System.IO;
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

        public async Task CreateFile(UserFileModel userFile)
        {
            var cloudBlobContainer = _blobClient.GetContainerReference(userFile.Login);
            if (await cloudBlobContainer.CreateIfNotExistsAsync().ConfigureAwait(false))
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob }).ConfigureAwait(false);
            }
            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(userFile.FileName);

            cloudBlockBlob.Properties.ContentType = userFile.ContentType;

            await cloudBlockBlob.UploadFromStreamAsync(userFile.File).ConfigureAwait(false);
        }

        public async Task<MemoryStream> GetFile(string login, string name)
        {
            var cloudBlobContainer = _blobClient.GetContainerReference(login);
            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(name);
            var stream = new MemoryStream();
            await cloudBlockBlob.DownloadToStreamAsync(stream).ConfigureAwait(false);
            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }

        public async Task<string[]> GetFilesNames(string login)
        {
            var cloudBlobContainer = _blobClient.GetContainerReference(login);
            var segment = await cloudBlobContainer.ListBlobsSegmentedAsync(null).ConfigureAwait(false);
            var list = new List<IListBlobItem>();
            list.AddRange(segment.Results);
            while (segment.ContinuationToken != null)
            {
                segment = await _blobClient.ListBlobsSegmentedAsync(login, segment.ContinuationToken).ConfigureAwait(false);
                list.AddRange(segment.Results);
            }
            return list.OfType<CloudBlockBlob>().Select(b => b.Name).ToArray();
        }

        public async Task RemoveFile(string login, string name)
        {
            var cloudBlobContainer = _blobClient.GetContainerReference(login);
            var blob = cloudBlobContainer.GetBlockBlobReference(name);
            await blob.DeleteIfExistsAsync().ConfigureAwait(false);
        }
    }
}
