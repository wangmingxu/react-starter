// import random from 'lodash/random';
// import set from 'lodash/set';
// import { voiceTpmMap } from 'constant';
import { IServerResponse } from 'Service/DefaultResInterceptor';
import { IResult } from 'types/result';
import { HttpAliasMap } from 'types/service';
// todo

const setResult = result => ({
  type: 'setResult',
  payload: result,
});

export const pollResult = analysisId => async (dispatch, getState) => {
  const { Injector } = getState();
  const api: HttpAliasMap = Injector.get('$http').alias;
  const pullTask = async () => {
    const rst = await api.pollResult<IServerResponse<IResult>>({ analysisId });
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
    return Promise.reject(rst.msg);
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
  const api: HttpAliasMap = Injector.get('$http').alias;
  const rst = await api.checkAppResult<IServerResponse<IResult>>();
  if (rst.rCode === 0) {
    dispatch(setResult(rst.data));
    return rst.data;
  }
  return Promise.reject(rst.msg);
};
