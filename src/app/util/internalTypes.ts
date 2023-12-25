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
  description: string;
  conclusion: string;
  statistics: {
    speed: number;
    acceleration: number;
    braking: number;
    traction: number;
  };
};
