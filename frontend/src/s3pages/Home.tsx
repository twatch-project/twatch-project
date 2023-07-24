import { useEffect, useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import SinglePost from './SinglePost'
import { host } from '../constant'

function App() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getPosts() {
      const result = await axios.get(`${host}`)
      setPosts(result.data)
    }
    getPosts()
  }, [])

  const likeClicked = async (arg: { id: any }) => {
    console.log(`likeClicked = (${arg.id})`)
  }
  const commentClicked = (arg: { id: any }) => {
    console.log(`commentClicked = (${arg.id})`)
  }
  const editPostClicked = (arg: { id: any }) => {
    navigate('/editPost/' + arg.id)
    console.log(`editPostClicked = (${arg.id})`)
  }
  const deletePostClicked = async (arg: { id: any }) => {
    console.log(`deletePostClicked = (${arg.id})`)
    console.log(`${host}/api/deletePost/` + arg.id)
    await axios.delete(`${host}/api/deletePost/` + arg.id)
    setPosts(posts.filter((post: any) => post.id !== arg.id))
  }

  const postActions = {
    likeClicked,
    commentClicked,
    editPostClicked,
    deletePostClicked,
  }

  return (
    <div className="App">
      <div className="flex flex-col space-y-100 items-center divide-y">
        {posts.map((post: any) => (
          <div key={`post-${post.id}`} className="px-5 py-14">
            <SinglePost className="relative" post={post} {...postActions}></SinglePost>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
