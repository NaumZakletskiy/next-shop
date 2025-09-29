export interface IProduct {
  _id: string;
  slug: {
    current: string;
  };
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}
