import type { UserRole } from "../enums/UserRole";
import type { Profile } from "./Profile"

export interface User {
    id: number;
    username: string;
    role: UserRole;
    profile: Profile;
}