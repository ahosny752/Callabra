import React, { useState, useContext } from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';

import useRequest from '../../hooks/useRequest';

const AddPost = ({
  allPostMutate,
  allPostData,

}) => {
  const [postVal, setPostVal] = useState('');
  const [profile] = useContext(UserProfileContext);

  const { handle } = profile;

  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: true,
  };
  const baseURL = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

  const url = `${baseURL}/${handle}/posts`;
  const {
    post,
    data,
    mutate,
  } = useRequest(url, swrOptions);

  const addButton = async () => {
    const body = {
      body: postVal,
    };
    await post(body);
    mutate(data, true);
    allPostMutate(allPostData, true);
  };

  const userBlogs = data || [];
  const blogs = userBlogs.map((item) => item.body);

  const blogItems = blogs.map((item, idx) => (
    <div key={idx.toString()}>
      <li>
        {idx + 1}
        {item}
      </li>
    </div>
  ));

  return (
    <div>
      <div>
        <div>Add a  Post</div>

        <input onChange={(e) => setPostVal(e.target.value)} value={postVal} type="text" placeholder="Write a post" />
      </div>

      <button onClick={addButton} type="button">Add</button>

      <div>
        My posts
        <div>{blogItems}</div>
      </div>
    </div>
  );
};

export default AddPost;
