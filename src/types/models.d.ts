export type user = {
  id: number;
  name: string;
  password: string;
  point: number;
  account_id: number;
  group_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
};

export type account = {
  id: number;
  nema?: string;
  email: string;
  created_at: string;
  updated_at: string;
};
