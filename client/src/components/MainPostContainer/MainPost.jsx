import axios from 'axios'
import React, { useRef,useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Content from '../ContentPostContainer/Content'
import Post from '../PostContainer/Post'
import "./mainpost.css"





function MainPost() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  let id = user?.other?._id;
  
  const accesstoken =  user.accessToken
  
  const [post,setPost] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true); 
   const getPost = async ()=>{
    try {
      
      const res = await axios.get(`http://localhost:5000/api/user/followerpost/${id}?page=${page}&limit=${limit}`,{
      headers:{
        token:accesstoken
      },
     
    })
    const newPosts = res.data.posts.filter((post) => !post.isDeleted);
    setPost(prevPosts => [...prevPosts, ...newPosts]);
    setHasMore(res.data.totalPages > page);
  } catch (error) {
    
    console.error(error);
    }
   }
   useEffect(() => {
   getPost()
  }, [])
  
  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  return (
    <div className='mainpost'>
      <Content/>
      {post.map((item, index) => {
  if (post.length === index + 1) {
    return (
      <div ref={lastPostRef} key={item._id}>
        <Post post={item} />
      </div>
    )
  } else {
    return (
      <Post post={item} key={item._id} />
    )
  }
})}
{hasMore && <p>Loading...</p>}
      {/* {post.map((item ,index)=>(
      
          <Post post={item} key={index} />
        
      ))}
       */}
       </div>
  )
}
// function Pagination({ currentPage, totalPages, onChange }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((page) => (
//           <li
//             key={page}
//             className={`page-item ${
//               currentPage === page ? "active" : ""
//             }`}
//           >
//             <button
//               onClick={() => onChange(page)}
//               className="page-link"
//             >
//               {page}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
export default MainPost