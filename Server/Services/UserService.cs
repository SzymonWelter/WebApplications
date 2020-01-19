using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Server.DAO;
using Server.Models.DAL;
using Server.Models.Domain;
using Server.Services.Contexts;
using Server.Services.Mapping;
using Server.Services.Repositories;

namespace Server.Services {
    internal class UserService : IUserService {
        private readonly IUsersRepository _userRepository;
        private readonly IMapService _mapService;
        private readonly IBlobStorageService _blobStorageService;
        private readonly HttpClient _httpClient;

        public UserService(IUsersRepository userRepository, IMapService mapService, IBlobStorageService blobStorageService) {
            _userRepository = userRepository;
            _mapService = mapService;
            _blobStorageService = blobStorageService;
            _httpClient = new HttpClient();
        }

        public async Task<MemoryStream> GetFbPhoto(string url) {
            var response = await _httpClient.GetAsync(url);
            var memoryStream = new MemoryStream();
            if (response.StatusCode == HttpStatusCode.OK) {
                using(var stream = await response.Content.ReadAsStreamAsync()) {
                    stream.CopyTo(memoryStream);
                }
            }
            memoryStream.Position = 0;
            return memoryStream;
        }
        public async Task<Guid> CreateUser(SignUpModel signUpModel) {

            var userId = GenerateId();
            var photoId = GenerateId();
            var personId = GenerateId();

            signUpModel.Photo.FileId = photoId;
            signUpModel.Photo.UserId = userId;

            await _blobStorageService.CreateContainer(userId.ToString());
            await _blobStorageService.CreateFile(signUpModel.Photo);

            var photo = _mapService.Map(signUpModel.Photo);
            photo.FileId = photoId;

            var user = _mapService.Map(signUpModel);

            user.UserId = userId;
            user.Person.PersonId = personId;
            user.Person.PhotoId = photoId;

            await _userRepository.AddAsync(user, photo);

            return userId;
        }

        public async Task<bool> UserExists(string username) {
            return await _userRepository.ExistsLoginAsync(username);
        }

        private Guid GenerateId() {
            return Guid.NewGuid();
        }
    }
}