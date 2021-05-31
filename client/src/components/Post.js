import React, { useContext } from 'react';
import { AuthContext } from './contex/auth';
import { Redirect } from 'react-router-dom';
import AddPost from './AddPost';



const Post = () => {
  const { user } = useContext(AuthContext);
  return !user ?  <Redirect to="/login" /> :  <AddPost />
}
export default Post;


