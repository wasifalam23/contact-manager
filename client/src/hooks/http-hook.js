import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const useHttp = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      dispatch(uiActions.setIsLoading({ isLoading: true }));
      // setIsLoading(true);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
        });

        // console.log(response);

        // if (!response.ok) {
        //   throw new Error('Request failed');
        // }

        const data = await response.json();

        if (requestConfig.method === 'POST' && data.status === 'success') {
          dispatch(uiActions.setIsSuccess({ isSuccess: true }));
        }

        if (data.status === 'fail') {
          dispatch(uiActions.setIsSuccess({ isSuccess: false }));
          throw new Error(data.message);
        }

        applyData(data);
      } catch (err) {
        dispatch(uiActions.setIsSuccess({ isSuccess: false }));
        dispatch(
          uiActions.setError({ error: err.message || 'Something went wrong!' })
        );
        // setError(err.message || 'Something went wrong!');
      }

      dispatch(uiActions.setIsLoading({ isLoading: false }));
    },
    [dispatch]
  );

  return {
    sendRequest,
    // isLoading,
    // isSuccess,
    // error,
  };
};

export default useHttp;
