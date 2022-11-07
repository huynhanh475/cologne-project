import { roles } from "./constants";

/**
 * Checks if user data exists in localStorage
 * @returns true if exists, false if undefined | null
 */
export const isLoggedIn = () => {
    const authData = localStorage.getItem("AUTH_DATA");
    return authData ? true : false;
};

/**
 * Upon successful login:
 * 1. Save cookie token to AUTH_DATA to localStorage.
 * 2. Reload page to /
 * @returns true if exists, false if undefined | null
 */
export const onLogInSuccess = (data) => {
    window.localStorage.setItem("AUTH_DATA", data["accessToken"]);
    window.localStorage.setItem("USER_DATA", JSON.stringify(data["user"]));
    
    const role = data.user.role;
    const userType = data.user.userType;
    let route;
    switch(role){
        case roles.admin:
            route = '/admin/homepage';
            break;
        case roles.client:
            route = `/${userType}/homepage`;
            break;
        default:
            break;
    }

    window.location.href = route;
};

/**
 * Get the user from encoded token string in AUTH_DATA localStorage
 * Redirect to login page fi token expires.
 * @returns IUser object | null
 */
export const getUser = () => {
    return window.localStorage.getItem("USER_DATA");
};

/**
 * Logs out by clearing storage, send a logout request and
 * redirect back to /login.
 */
export const logout = () => {
    window.localStorage.removeItem("AUTH_DATA");
    window.localStorage.removeItem("USER_DATA");
    window.location.href = "/";
};