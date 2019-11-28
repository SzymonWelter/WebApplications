import { authenticationService } from "./authentication.service";
import { authHeader } from "src/js/helpers"
import config from 'config';
export const filesService = {
    filesNames,
    upload,
    download,
    remove
}

async function filesNames(){

    const requestOptions = {
        method: 'GET',
        headers:{
            "Authorization": authHeader().Authorization
        }
    }
    const response = await fetch(`${config.apiUrl}/files`,requestOptions);
    if(!response.ok){
        throw new Error("Can not connect with server");
    }
    return await response.json();
}

async function upload(formData){
    const token = authenticationService.currentUserValue;
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await fetch(`${config.apiUrl}/files`,requestOptions)
    if(!response.ok){
        throw new Error("Can not connect with server");
    }
}

async function download(name){
    const token = authenticationService.currentUserValue;
    const requestOptions = {
        method: 'GET',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }
    const url = `${config.apiUrl}/files/download/${name}`;
    const response = await fetch(url,requestOptions);
    if(!response.ok){
        throw new Error("Can not connect with server");
    }

    return await response.blob();
}

async function remove(name){
    const token = authenticationService.currentUserValue;
    const requestOptions = {
        method: 'DELETE',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }
    const url = `${config.apiUrl}/files/${name}`;
    const response = await fetch(url,requestOptions);
    if(!response.ok){
        throw new Error("Can not connect with server");
    }
}