export interface ProductType {
  id: number;
  uid: string;
  name: string;
  slug: string;
  product_type: string;
  shop: {
    id: number;
    uid: string;
    owner_id: number;
    name: string;
    slug: string;
    description: string;
    cover_image: string;
    logo: string;
    is_active: number;
    address: string[];
    created_at: string;
    updated_at: string;
  };
  selling_price: number;
  image: string;
  status: string;
  price: number;
  quantity: number;
  visibility: 1 | 0;
}

export interface ShopType {
  id: number;
  uid: string;
  owner_id: number;
  name: string;
  slug: string;
  description: string;
  shop_website_link: string | null;
  cover_image: string;
  logo: string;
  is_active: number;
  address: {
    '%22address%22': string;
    '%22city%22': string;
    '%22state%22': string;
    '%22country%22': string;
  };
  created_at: string;
  updated_at: string;
}
