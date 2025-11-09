export interface Popup {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number; // in miles
  driveTime: string;
  cuisine: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  attendees: number; // number of people attending
  rating?: number;
  hours?: string;
  contact?: string;
}
