export interface Square {
  participants: Participant[];
}

export interface Participant {
  realName: string;
  falseName: string | null;
}

export interface WithId {
  id: string;
}

export interface JoinSquareData {
  squareId: string;
  userName: string;
}
