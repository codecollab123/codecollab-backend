export interface RecentActivityItem {
  _id: string;
  userId: string;
  action: string;
  meta?: Record<string, any>;
  createdAt: string; // ISO string
}

export interface GetRecentActivityResponse {
  data: RecentActivityItem[];
}
