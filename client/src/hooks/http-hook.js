import { useState } from 'react';
import { useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [postReqSuccess, setPostReqSuccess] = useState(false);
  const [patchReqSuccess, setPatchReqSuccess] = useState(false);
  const [deleteReqSuccess, setDeleteReqSuccess] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
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

      applyData(data);

      if (requestConfig.method === 'POST' && data.status === 'success') {
        setPostReqSuccess(true);
      }

      if (requestConfig.method === 'PATCH' && data.status === 'success') {
        setPatchReqSuccess(true);
      }

      if (requestConfig.method === 'DELETE' && data.status === 'success') {
        setDeleteReqSuccess(true);
      }

      if (data.status === 'fail') {
        throw new Error(data.message);
      }
    } catch (err) {
      setIsError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
    isError,
    postReqSuccess,
    patchReqSuccess,
    deleteReqSuccess,
  };
};

export default useHttp;
