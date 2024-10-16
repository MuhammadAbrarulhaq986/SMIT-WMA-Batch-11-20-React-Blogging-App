import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = () => {
  const params = useParams();
  const {blogId} = params;
  return (
    <div>SingleBlog</div>
  )
}

export default SingleBlog