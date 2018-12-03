export function setUserInfo(payload) {
  return {
    type: 'setUserInfo',
    payload,
  };
}

export function resetUserInfo() {
  return { type: 'resetUserInfo' };
}
