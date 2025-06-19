import type { MeetingLevel } from "../enums/MeetingLevel";

export interface Meeting {
  id: number;
  title: string;
  description: string;
  dateTime: Date;
  level: MeetingLevel;
  participants: string;
}