import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import logoutUser from '../../util/helperFunctions';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import useRequest from '../../hooks/useRequest';

const baseUrl = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

const NewPost = () => {
  const [profile, setProfile] = useContext(UserProfileContext);
  const [postVal, setPostVal] = useState('');
  const [daBlog, setDaBlog] = useState([]);

  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  };

  const { handle } = profile;
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const {
    data: blogData,
    isValidating,
    error,
    mutate,
    revalidate,
  } = useSWR(`${baseUrl}/posts`, fetcher, swrOptions);

  const addButton = async () => {
    const options = {
      url: '/posts',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('FBIdToken')}`,
      },
      data: { body: postVal },
    };
    mutate(blogData, true);
    await axios(options);
    // revalidate();
  };

  useEffect(() => {
    if (blogData) {
      setDaBlog(blogData);
    }
  }, [blogData]);

  console.log('dablog', daBlog);

  return (
    <div>
      <div>
        <div>My Posts</div>
        {daBlog.length > 0 ? daBlog.map((item) => (
          <div>
            {' '}
            {item.body}
          </div>
        )) : ''}
      </div>
      <div>
        <input onChange={(e) => setPostVal(e.target.value)} value={postVal} type="text" placeholder="Write a post" />
      </div>

      <button onClick={addButton} type="button">Add</button>

    </div>
  );
};

export default NewPost;
