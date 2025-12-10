export interface Last24HoursActivityItem {
  _id: string;
  userId: string;
  action: string;
  meta?: Record<string, any>;
  createdAt: string;
}

export interface GetLast24HoursActivityResponse {
  data: Last24HoursActivityItem[];
}
