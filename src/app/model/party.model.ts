export interface Party {
  isRunning: boolean;
  participants: { [id: string]: Participant };
  messages: Message[];
}

export interface Message extends Participant {
  message: string;
  sentOn: Date;
}

export interface Participant {
  userId: string;
  realName: string;
  falseName: string | null;
}

export interface WithId {
  id: string;
}

export interface JoinPartyData {
  partyId: string;
  userName: string;
}
