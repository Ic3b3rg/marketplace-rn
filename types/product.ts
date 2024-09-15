export interface ProductListItem {
  id: string;
  image: string;
  title: string;
}

export interface ProductDetail extends ProductListItem {
  description: string;
  price: string;
  rating: number;
  createdAt: string;
}
