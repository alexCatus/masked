export interface Party {
  id?: string;
  isRunning: boolean;
  participants: { [id: string]: Participant };
  messages: Message[];
}

export interface Message extends Participant {
  message: string;
  sentOn: Date;
  userId: string;
}

export interface Participant {
  id?: string;
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

export function PartyGenerator(
  partyId: string,
  participant: Participant & WithId
): Party & WithId {
  return {
    id: partyId,
    isRunning: false,
    messages: [],
    participants: { [participant.id]: participant },
  };
}

export function AddUserToParty(
  party: Party & WithId,
  participant: Participant & WithId
) {
  return {
    ...party,
    participants: {
      ...participant,
      [participant.id]: participant,
    },
  };
}
