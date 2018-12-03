import { IResult } from 'types/result';

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
    voiceStar:        -1,
    matchType:        -1,
    voiceTypeVal:     -1,
    semeVal:          -1,
    voiceManAudioUrl: ''  
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
