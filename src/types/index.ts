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

export interface ShoppingListWithItems extends ShoppingList {
  items: ShoppingItem[];
}

export interface AdminList extends ShoppingList {
  item_count: number;
}

export interface PaginatedLists {
  lists: AdminList[];
  total: number;
  page: number;
  limit: number;
} 