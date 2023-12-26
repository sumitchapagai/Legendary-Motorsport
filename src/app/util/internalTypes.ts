export type Car = {
  id: string;
  model: string;
  category: string;
  price: number;
  seat: number;
};

export type CarDetails = {
  model: string;
  price: number;
  'prince-2'?: number;
  description: string;
  conclusion?: string;
  stats: {
    speed: number;
    acceleration: number;
    braking: number;
    traction: number;
  };
};
