export function loadItems() {
  return (dispatch: any) => {
    dispatch({ type: 'SUCCESS', payload: 'browser success' });
  };
}