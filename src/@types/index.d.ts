export type Event = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  finish_date: string;
  start_hour: string;
  address: string;
  location: {
    coordinates: Array;
  };
  distance: number;
  picture?: string | null;
  host: {
    id: number;
  };
};
