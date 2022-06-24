export interface IProduct {
  id: string;
  title: string;
  length: number;
  project: string;
  product: string;
  price: string;
  info: string;
  imagekey: string;
  qty: string;
  primaryImage: boolean;
  imageBuffer: string;
}

export interface ISelectedProduct {
  title: string;
  product: string;
  price: string;
  info: string;
  imagekey: string;
  imageBuffer: string;
  qty: string;
}

export interface ICart {
  id: string;
  title: string;
  product: string;
  price: string;
  info: string;
  imagekey: string;
  imageBuffer: string;
  qty: number;
  primaryImage: boolean;
  cartItems: string[];
}

export interface ICheckout {
  id: string;
  shipment: string[];
  address: string;
  suite: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ICourse {
  id: string;
  title: string;
  subject: string;
  imagekey?: string;
  imageBuffer?: string;
  content?: string;
  info: string;
  price: number;
}

export interface IBlog {
  id: string;
  title: string;
  imagekey?: string;
  imageBuffer?: string;
  content: string;
  info: string;
}

export interface IVideos {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: IPageInfo;
  items: IItem[];
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface IItem {
  kind: string;
  etag: string;
  id: IId;
}

export interface IId {
  kind: string;
  videoId?: string;
  channelId?: string;
}

export interface IProject {
  id: string;
  title: string;
  imagekey?: string;
  imageBuffer?: string;
  info: string;
}

export interface IDay {
  value: string;
  hasEvent: boolean;
  date: string;
  today: string;
}

export interface IEvent {
  id: string;
  title: string;
  event_date: string;
  imagekey?: string;
  imageBuffer?: string;
  price?: number;
  info: string;
  spots: string;
}

export interface INotification {
  id: string;
  title: string;
  date: string;
  type: string;
  price?: number;
  imagekey?: string;
  imageBuffer?: string;
}

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: File;
  bio: string;
  city: string;
  state: string;
  zip: string;
  iv: string;
  interests: [];
  cart: ICart[];
  phoneNumber: string;
  address: string;
  website: string;
  twitter: string;
  linkedIn: string;
  youtube: string;
}
