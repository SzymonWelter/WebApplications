export class InputModel{
    constructor(name, type, placeholder = "", activityHandler = () => {}, onChangeHandler = () => {}){
        this.name = name;
        this.type = type;
        this.placeholder = placeholder;
        this.activityHandler = activityHandler;
        this.onChangeHandler = onChangeHandler;
    }
    name = "";
    type = "";
    value = "";
    placeholder = "";
    isActive = false;
    activityHandler = () => {};
    onChangeHandler = () => {};

}