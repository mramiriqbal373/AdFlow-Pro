export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Ad {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'active' | 'rejected' | 'expired';
  created_at: string;
}
