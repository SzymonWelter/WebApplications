using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Server.Models.DAL;
using Server.Models.Domain;
using Server.Models.DTO;
using Server.Models.Enums;

namespace Server.Services.Mapping {
    public class MapService : IMapService {
        public SignUpModel Map(SignUpModelDTO userDTO) {
            var result = new SignUpModel {
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Login = userDTO.Login,
                Password = userDTO.Password,
                Birthday = DateTime.Parse(userDTO.Birthday),
                Pesel = userDTO.Pesel,
                Sex = Enum.Parse<Sex>(userDTO.Sex, true),
                Photo = Map(new UserFileDTO { File = userDTO.Photo })
            };
            return result;
        }
        public SignUpModel Map(FbSignUpModelDTO userDTO) {
            var result = new SignUpModel {
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Login = userDTO.Email,
                Sex = Enum.Parse<Sex>(userDTO.Sex, true),
                Password = userDTO.AccessToken
            };
            return result;
        }

        public SignInModel Map(SignInModelDTO signInModel) {
            var result = new SignInModel {
                Login = signInModel.Login,
                Password = signInModel.Password
            };
            return result;
        }

        public AuthenticationResultDTO Map(AuthenticationResultModel authenticationResult) {
            var result = new AuthenticationResultDTO {
                IsSuccess = authenticationResult.IsSuccess,
                Message = authenticationResult.Message,
                Token = authenticationResult.Token
            };
            return result;
        }

        public UserFileModel Map(UserFileDTO userFileDTO) {
            var userFileModel = new UserFileModel {
                File = new MemoryStream()
            };
            userFileDTO.File.CopyTo(userFileModel.File);
            userFileModel.File.Seek(0, SeekOrigin.Begin);
            userFileModel.FileName = Path.GetFileName(userFileDTO.File.FileName);
            userFileModel.ContentType = userFileDTO.File.ContentType;
            return userFileModel;
        }

        public FileDAL Map(UserFileModel userFile) {
            var file = new FileDAL {
                FileName = userFile.FileName,
                FileId = userFile.FileId,
                ContentType = userFile.ContentType,
                PublisherId = userFile.UserId
            };
            return file;
        }

        public UserFileModel Map(FileDAL fileDAL) {
            var file = new UserFileModel {
                FileName = fileDAL.FileName,
                FileId = fileDAL.FileId,
                ContentType = fileDAL.ContentType
            };
            return file;
        }

        public UserDAL Map(SignUpModel signUpModel) {
            var user = new UserDAL {
                Login = signUpModel.Login,
                Password = signUpModel.Password,
                Person = new PersonDAL {
                FirstName = signUpModel.FirstName,
                LastName = signUpModel.LastName,
                Birthday = signUpModel.Birthday,
                Pesel = signUpModel.Pesel,
                Sex = (char)signUpModel.Sex,
                }
            };
            return user;
        }

        public SignInModel Map(FbSignInModelDTO fbSignInModelDTO) {
            var signInModel = new SignInModel {
                Login = fbSignInModelDTO.Email,
                Password = fbSignInModelDTO.AccessToken
            };
            return signInModel;
        }
    }
}