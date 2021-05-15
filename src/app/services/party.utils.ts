import { Party, WithId, Participant } from '../model/party.model';

import * as _ from 'lodash';

export function startParty(party: Party) {
  const participants = assignateName({
    ...party.participants,
  });
  return {
    ...party,
    participants: participants,
    isRunning: true,
  };
}
export function assignateName(participants: { [key: string]: Participant }) {
  const participantsCloned = _.clone(participants);
  let realNames: Participant[] = _.values(participants);
  let falseNames: string[] = _.clone(realNames).map(
    (participant) => participant.id
  );
  while (!realNames.every((value, index) => falseNames[index] != value.id)) {
    falseNames = _.shuffle(falseNames);
  }
  console.log('after while', falseNames);
  falseNames.forEach((value, index) => {
    const key = realNames[index].id;
    participantsCloned[key].falseName = participants[value].realName;
  });
  return participantsCloned;
}
