export function loadItems() {
  return (dispatch: any) => {
    dispatch({ type: 'SUCCESS', payload: 'server success' });
  };
}