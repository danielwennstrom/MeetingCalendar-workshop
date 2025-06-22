import type { Profile } from "./Profile"

export interface User {
    id: number;
    username: string;
    // role: string;
    profile: Profile;
}