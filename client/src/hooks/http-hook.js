import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const useHttp = () => {
  const [isError, setIsError] = useState(null);
  const [postReqSuccess, setPostReqSuccess] = useState(false);
  const [patchReqSuccess, setPatchReqSuccess] = useState(false);
  const [deleteReqSuccess, setDeleteReqSuccess] = useState(false);

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      dispatch(uiActions.setIsLoading(true));
      setIsError(null);
      setPostReqSuccess(false);
      setPatchReqSuccess(false);
      setDeleteReqSuccess(false);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
        });

        const data = await response.json();

        // if (requestConfig.method !== 'GET' && data.status === 'success') {
        //   // console.log('success running hook-http');
        //   dispatch(uiActions.setRequestIsSuccess());
        // }

        if (requestConfig.method === 'POST' && data.status === 'success') {
          setPostReqSuccess(true);
          dispatch(uiActions.setRequestIsSuccess(true));
        }

        if (requestConfig.method === 'PATCH' && data.status === 'success') {
          setPatchReqSuccess(true);
          dispatch(uiActions.setRequestIsSuccess(true));
        }

        if (requestConfig.method === 'DELETE' && data.status === 'success') {
          setDeleteReqSuccess(true);
          dispatch(uiActions.setRequestIsSuccess(true));
        }

        if (data.status === 'fail') {
          throw new Error(data.message);
        }

        applyData(data);
      } catch (err) {
        setIsError(err.message || 'Something went wrong!');
      }

      dispatch(uiActions.setIsLoading(false));
    },
    [dispatch]
  );

  return {
    sendRequest,
    isError,
    postReqSuccess,
    patchReqSuccess,
    deleteReqSuccess,
  };
};

export default useHttp;
