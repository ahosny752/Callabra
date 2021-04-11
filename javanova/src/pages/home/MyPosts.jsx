import React, { useContext } from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import useRequest from '../../hooks/useRequest';
const baseUrl = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

const MyPosts = () => {
  const [profile] = useContext(UserProfileContext);

  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  };

  const {
    data,
  } = useRequest(`${baseUrl}/posts`, swrOptions);

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
        <div>My Posts</div>
        {blogItems}
      </div>

    </div>
  );
};

export default MyPosts;
