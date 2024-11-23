export type Drivers = {
    id: number;
    name: string;
    description: string;
    car: string;
    review: {
      rating: number;
      comment: string;
    };
    value?: number;
    tax ?: number;
    minKm?: number
};