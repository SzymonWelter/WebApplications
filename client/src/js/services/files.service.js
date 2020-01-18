import { requestService } from "./request.service";
import config from "config";
export const filesService = {
  getFiles,
  upload,
  download,
  remove
};

async function getFiles() {
  return (await requestService.get(`${config.apiUrl}/files`)).json();
}

async function upload(formData) {
  await requestService.post(`${config.apiUrl}/files`, formData);
}

async function download(id) {
  const url = `${config.apiUrl}/files/download/${id}`;

  const response = await requestService.get(url);
  return await response.blob();
}

async function remove(name) {
  const url = `${config.apiUrl}/files/${name}`;
  await requestService.del(url);
}
