import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    roles: string[]
    iat: number;
    exp: number;
}

export function getRole() {
    const token = localStorage.getItem("access_token");
    const decoded = jwtDecode<JwtPayload>(token);

    if (token) {
        return decoded.roles[0];
    }
}