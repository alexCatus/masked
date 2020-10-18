import { Participant } from '../model/party.model';

export function mockParticipants(): { [id: string]: Participant } {
  return {
    '0002': {
      userId: '0002',
      realName: 'Natasha',
      falseName: null,
    },
    '0003': {
      userId: '0003',
      realName: 'Joanie',
      falseName: null,
    },
    '0004': {
      userId: '0004',
      realName: 'Sarah',
      falseName: null,
    },
  };
}
