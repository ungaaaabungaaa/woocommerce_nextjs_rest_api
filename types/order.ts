export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: {
    src: string;
  };
}

export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface OrderDetails {
  id: number;
  status: string;
  date_created: string;
  total: string;
  currency_symbol: string;
  billing: Address;
  shipping: Address;
  line_items: OrderItem[];
  payment_method: string;
  transaction_id: string;
}
