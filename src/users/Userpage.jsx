import React from 'react'
import instance from '../api'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import useCurrentUser from '../hooks/useCurrentUser';
import { defaultImage } from '../App';

function Userpage() {
  const { loading, user } = useCurrentUser()

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
  else {
    return (
      <div>
        <Card sx={{ maxWidth: 345, margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {user.username[0]}
              </Avatar>
            }
            action={
              <MoreVertIcon />
            }
            title={user.username}
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image={user.avatar.url == null ? defaultImage : 'http://localhost:3000/' + user.avatar.url}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default Userpage