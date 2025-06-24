import type { User } from "./User";

export interface UserAuthRegister extends User {
    password: string;
}