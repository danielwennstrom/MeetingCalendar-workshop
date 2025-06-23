import { getRole } from "./jwtUtils";

export function isAdmin() {
  const role = getRole();
  return role === "ROLE_ADMIN";
}

export function isUser() {
  const role = getRole();
  return role === "ROLE_USER";
}
