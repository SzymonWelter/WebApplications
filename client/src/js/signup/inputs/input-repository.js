import {InputModel} from './';

export const Inputs = () => [...inputGroup]

const inputGroup = [
    new InputModel(
        "firstName",
        "text",
        "Wrong first name",
        "first name"
      ),
      new InputModel(
        "lastName",
        "text",
        "Wrong last name",
        "last name"
      ),
      new InputModel(
        "login",
        "text",
        "User with this login already exists",
        "login"
      ),
      new InputModel(
        "password",
        "password",
        "Password is too week - minimum 8 characters",
        "password",
      ),
      new InputModel(
        "confirmPassword",
        "password",
        "Passwords does not match with each other",
        "confirm password"
      ),
      new InputModel(
        "birthday",
        "date",
        "Wrong date",
        "birthday"
      ),
      new InputModel(
        "pesel",
        "text",
        "Format of pesel is incorrect",
        "pesel"
      ),
      new InputModel(
        "sex",
        "radio",
        "",
        "sex"
      ),
      new InputModel(
        "photo",
        "file",
        "File must be in image format",
        "photo"
      ),
      new InputModel("clear", "button"),
      new InputModel("signup", "submit")
];