export interface Team {
  _id: string;
  name: string;
  thumbnail: string;
  players: string[];
}

export interface Player {
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: string;
}
