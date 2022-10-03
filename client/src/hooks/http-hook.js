import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const useHttp = () => {
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      dispatch(uiActions.setIsLoading(true));

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
        });

        const data = await response.json();

        if (requestConfig.method === 'POST' && data.status === 'success') {
          dispatch(
            uiActions.setRequestIsSuccess({
              isSuccess: true,
              message: 'Contact added successfully',
            })
          );
        }

        if (requestConfig.method === 'PATCH' && data.status === 'success') {
          dispatch(
            uiActions.setRequestIsSuccess({
              isSuccess: true,
              message: 'Contact updated successfully',
            })
          );
        }

        if (requestConfig.method === 'DELETE' && data.status === 'success') {
          dispatch(
            uiActions.setRequestIsSuccess({
              isSuccess: true,
              message: 'Contact deleted successfully',
            })
          );
        }

        if (data.status === 'fail') {
          uiActions.setRequestIsSuccess({
            isSuccess: false,
            message: null,
          });
          throw new Error(data.message);
        }

        applyData(data);
      } catch (err) {
        dispatch(uiActions.setError(err.message || 'Something went wrong!'));
      }

      dispatch(uiActions.setIsLoading(false));
    },
    [dispatch]
  );

  return {
    sendRequest,
  };
};

export default useHttp;
