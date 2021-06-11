import axios from 'axios';

const UsePost = async (url, body) => {
  const options = {
    url,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('FBIdToken')}`,
    },
    data: { body },
  };

  await axios(options)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    // post,
    // postData,
    // postError,
    // postIsLoading,
    // data: response && response.data,
    // isValidating,
    // error,
    // mutate,
    // revalidate,
  };
};

export default UsePost;
