import { voiceTpmMap } from '@/constant';
import { IServerResponse } from '@/Service/DefaultResInterceptor';
import { HttpAliasMap, IResult } from '@/types';
import random from 'lodash/random';
import set from 'lodash/set';

const setResult = (result) => {
  const payload = set(
    result,
    'voiceMan.temperament',
    random(voiceTpmMap[`${result.voiceMan.voiceType}`].length - 1),
  );
  return {
    type: 'setResult',
    payload,
  };
};

export const pollResult = analysisId => async (dispatch, getState) => {
  const { Injector } = getState();
  const httpAlias: HttpAliasMap = Injector.get('$http').alias;
  const pullTask = async () => {
    const rst = await httpAlias.pollResult<IServerResponse<IResult>>({ analysisId });
    if (rst.rCode === 0) {
      return rst.data;
    }
    if (rst.rCode === 1) {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      const result = await pullTask();
      return result;
    }
    return Promise.reject(new Error(rst.msg));
  };
  try {
    const result = await pullTask();
    dispatch(setResult(result));
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkAppResult = () => async (dispatch, getState) => {
  const { Injector } = getState();
  const httpAlias: HttpAliasMap = Injector.get('$http').alias;
  const rst = await httpAlias.checkAppResult<IServerResponse<IResult>>({needToken: true});
  if (rst.rCode === 0) {
    dispatch(setResult(rst.data));
    return rst.data;
  }
  return Promise.reject(new Error(rst.msg));
};
