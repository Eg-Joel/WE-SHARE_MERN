import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as timeago from 'timeago.js';
import axios from '../../utils/axios';
import { setUserss } from '../ReduxContainer/useReducer';



const NotificationItem = ({ notification }) => {

    const userDetails = useSelector((state) => state.user)
    const currentUser = userDetails.user
    let id = currentUser._id
    const accesstoken = currentUser.accesstoken
    const followings = currentUser?.other?.following;
    const [buttonState, setButtonState] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const config = {
        headers: { token: ` ${accesstoken}` }
    }

    const handleFollow = async (friendId) => {
        if (buttonState) {
            return
        }
        setLoading(true);
        const data = await axios.put(`user/follow`, { friendId }, config)
        const userDet = data.data.updatedUser
        dispatch(setUserss(userDet))
        //   setFollow(userToFollow)
        setLoading(false);
        setButtonState(true)
    }

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box marginTop="1rem" minWidth="max-content">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Avatar src={notification?.friend?.profile} sx={{ width: 60, height: 60 }} />
                    <Box marginLeft="1rem">
                        <Typography variant="p" fontWeight={600}>
                            {notification?.friend?.username}
                        </Typography>
                        <Typography variant="p" marginLeft="1rem" >
                            {notification?.content}
                        </Typography>
                        <Typography variant="p" marginLeft="1rem" >
                            {timeago.format(notification?.createdAt)}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ marginTop: "1rem" }} >
                {
                    notification?.type === "like" &&
                    <img src={notification?.postId?.image} alt='' style={{
                        width: "4rem",
                        height: "4rem",
                        objectFit: "cover"
                    }} />
                }
                {
                    notification?.type === "Comment" &&
                    <img src={notification?.postId?.image} alt='' style={{
                        width: "4rem",
                        height: "4rem",
                        objectFit: "cover"
                    }} />
                }
                {
                    notification?.type !== "like" | "Comment" && !followings?.includes(notification?.friend._id) ?
                        <LoadingButton
                            size="small"
                            fullWidthonClick={() => handleFollow(notification?.friend._id)}
                            loading={loading}
                            variant="contained"
                        >
                            <span>{buttonState ? 'Following' : "Fowllow back"}</span>
                        </LoadingButton> : ''
                }
            </Box>
        </Stack>
    )
}

export default NotificationItem