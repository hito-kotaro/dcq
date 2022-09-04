export interface userType {
  id: number;
  name: string;
  password: string;
  point: number;
  account_id: number;
  group_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export interface accountType {
  id: number;
  nema: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}
