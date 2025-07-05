export interface ShoppingList {
  id: number;
  code: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ShoppingItem {
  id: number;
  list_id: number;
  name: string;
  status: 'pending' | 'bought' | 'unavailable';
  position: number;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  is_admin: boolean;
  created_at: string;
}

export interface ShoppingListWithItemCount extends ShoppingList {
  item_count: number;
}

export interface PaginatedLists {
  lists: ShoppingListWithItemCount[];
  total: number;
  page: number;
  limit: number;
} 