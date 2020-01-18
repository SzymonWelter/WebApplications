using System;
using System.Threading.Tasks;
using Server.DAO;
using Server.Models.DAL;
using Server.Models.Domain;
using Server.Services.Contexts;
using Server.Services.Mapping;
using Server.Services.Repositories;

namespace Server.Services
{
    internal class UserService : IUserService
    {
        private readonly IUsersRepository _userRepository;
        private readonly IMapService _mapService;
        private readonly IBlobStorageService _blobStorageService;

        public UserService(IUsersRepository userRepository, IMapService mapService, IBlobStorageService blobStorageService)
        {
            _userRepository = userRepository;
            _mapService = mapService;
            _blobStorageService = blobStorageService;
        }

        public async Task<Guid> CreateUser(SignUpModel signUpModel)
        {

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

        public async Task<bool> UserExists(string username){
            return await _userRepository.ExistsLoginAsync(username);
        }

        private Guid GenerateId()
        {
            return Guid.NewGuid();
        }
    }
}