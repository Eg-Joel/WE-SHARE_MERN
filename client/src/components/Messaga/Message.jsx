import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';
import * as timeago from 'timeago.js';

function Message({msg}) {

    const userDetails = useSelector((state) => state.user)
    let CurrentUser = userDetails.user
    let UserId = CurrentUser?.other?._id
   
  return (
    < Box sx={{
        display: "flex",
        ...(msg?.sender === UserId && {
          alignItems: "flex-end",
        }),
        flexDirection: "column"
      }}>
        <Box sx={{
          maxWidth: "75%",
          width:"max-content",
          minHeight: "max-content",
          marginTop: "1rem",
          ...(msg?.sender === UserId && {
            backgroundColor: "#b1c9ad",
          }),
    ...(msg?.sender !== UserId && {
            backgroundColor: "white",
          }),
          borderRadius: "0px 10px 10px 10px",
          padding: "1rem"
        }}>
          <Typography color='black' variant='p' component='p'>
           {msg?.text}
    </Typography>
  </Box>
  <Typography fontSize={11}>
    {timeago.format(msg?.createdAt)}
  </Typography>
  
       
      </Box >
  )
}

export default Message