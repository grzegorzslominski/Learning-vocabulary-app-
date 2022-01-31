export const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.user };
    case 'logout':
      return { ...state, user: null };
    default:
      throw new Error(`There is no such action: ${action.type}`);
  }
};

export const intialState = {
  user: JSON.parse(window.localStorage.getItem('token-data')) ?? null
};
