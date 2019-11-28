import { authenticationService } from 'src/js/services';

export function authHeader() {
    const currentUser = authenticationService.currentUserValue;
    if (currentUser) {
        return { Authorization: `Bearer ${currentUser}` };
    } else {
        return {};
    }
}