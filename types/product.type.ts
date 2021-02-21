export type TProductItem = {
  uuid: string;
  title: string;
  description: string;
  discount: number;
  retail_price: TRetailPrice;
  original_retail_price: TRetailPrice;
  cover_image_url: string;
}

export type TRetailPrice = {
  value: number;
  formatted_value: string;
}
