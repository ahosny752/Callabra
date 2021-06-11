import { useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';

const useRequest = (url, swrOptions) => {
  let options = {
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('FBIdToken')}`,
    },
  };

  // eslint-disable-next-line max-len
  const [postBodyData, setPostBodyData] = useState({ postData: null, postError: null, postIsLoading: false });
  const baseURL = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

  const {
    data: response, error, isValidating, revalidate, mutate,
  } = useSWR(
    JSON.stringify(url),
    async () => {
      if (url === `${baseURL}/login` || url === `${baseURL}/signup`) {
        return null;
      }
      if (url.includes('undefined')) {
        // console.error(`Error: One or more URL Parameters are undefined, URL: ${url}`);
        return null;
      }
      return axios.get(url, options);
    },
    swrOptions,
  );

  const post = async (body) => {
    options = {
      ...options,
      method: 'POST',
      data: body,
    };

    setPostBodyData((prevState) => ({ ...prevState, postIsLoading: true }));
    await axios(options)
      .then((res) => {
        if (res.data) {
          setPostBodyData((prevState) => ({
            ...prevState, postData: res.data, postError: null, postIsLoading: false,
          }));
        }
      })
      .catch((err) => {
        setPostBodyData({ postData: null, postError: err.response.data, postIsLoading: false });
      });
  };

  const { postData, postError, postIsLoading } = postBodyData;

  return {
    post,
    postData,
    postError,
    postIsLoading,
    data: response && response.data,
    isValidating,
    error,
    mutate,
    revalidate,
  };
};

export default useRequest;
