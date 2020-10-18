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

export function PartyGenerator(partyId: string): Party & WithId {
  return {
    id: partyId,
    isRunning: false,
    messages: [],
    participants: {},
  };
}

export function AddUserToParty(
  party: Party & WithId,
  participant: Participant
) {
  return {
    ...party,
    participants: {
      ...participant,
      [participant.userId]: participant,
    },
  };
}
