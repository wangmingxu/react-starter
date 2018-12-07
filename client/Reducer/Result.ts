import { IResult } from '@/types';

const initState: IResult = {
  color: '',
  rates: [],
  background: '',
  backgroundV2: '',
  voiceMan: {
    voiceManLink:     '',
    voiceManCover:    '',
    voiceType:        -1,
    similarityPerson: '',
    voiceStar:        0,
    matchType:        -1,
    voiceTypeVal:     -1,
    semeVal:          -1,
    voiceManAudioUrl: '',
    temperament:      -1  
  },
};

const Result = (state = initState, action) => {
  switch (action.type) {
  case 'setResult':
    return action.payload;
  default:
    return state;
  }
};

export default Result;
