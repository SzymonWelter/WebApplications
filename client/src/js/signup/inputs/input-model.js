export class InputModel{
    constructor(name, type, errorMessage ,placeholder = "",defaultValue = ""){
        this.name = name;
        this.type = type;
        this.errorMessage = errorMessage;
        this.placeholder = placeholder;
        this.isValid = true;
        this.isActive = false;
        this.value = defaultValue;
    }

}