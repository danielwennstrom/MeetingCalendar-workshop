import type { MeetingLevel } from "../enums/MeetingLevel";
import type { User } from "./User";

export interface Meeting {
  id: number;
  title: string;
  description: string;
  dateTime: Date;
  level: MeetingLevel;
  creator: User
  participantIds: number[];
}