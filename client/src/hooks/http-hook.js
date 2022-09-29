import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
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

      if (data.status === 'success') {
        setIsSuccess(true);
      }

      if (data.status === 'fail') {
        setIsSuccess(false);
        throw new Error(data.message);
      }

      applyData(data);
    } catch (err) {
      setIsSuccess(false);
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    isLoading,
    isSuccess,
    error,
  };
};

export default useHttp;
