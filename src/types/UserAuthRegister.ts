import type { Profile } from "./Profile"

export interface UserAuthRegister {
    username: string;
    password: string;
    profile: Profile;
}