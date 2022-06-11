export interface IProduct {
  length: number;
  project: string;
  id: string;
  title: string;
  product: string;
  price: string;
  info: string;
  imageKey?: string;
  qty: number;
  primaryImage: boolean;
  imageBuffer?: string;
}

export interface ICart {
  id: string;
  title: string;
  product: string;
  price: string;
  info: string;
  imageKey: string;
  imageBuffer: string;
  qty: number;
  primaryImage: boolean;
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
  imageKey?: string;
  imageBuffer?: string;
  content?: string;
  info: string;
  price: number;
}

export interface IBlog {
  id: string;
  title: string;
  imageKey?: string;
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
  imageKey?: string;
  imageBuffer?: string;
  info: string;
}

export interface IDay {
  value: any;
  date: string;
  today: string;
  hasEvent: boolean;
}

export interface IEvent {
  id: string;
  title: string;
  event_date: string;
  imageKey?: string;
  imageBuffer?: string;
  price?: number;
  info: string;
}

export interface INotification {
  id: string;
  title: string;
  date: string;
  type: string;
  price?: number;
  imageKey?: string;
  imageBuffer?: string;
}

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: number;
  iv: string;
  interests: [];
  cart: ICart[];
}
