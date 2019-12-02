import { authenticationService } from "src/js/services";

export function handleResponse(response) {
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      authenticationService.logout();
      location.reload(true);
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  if(response.headers["Authorization"]){
    authenticationService.renewToken(response.headers["Authorization"]);
  }
  return response;
}
