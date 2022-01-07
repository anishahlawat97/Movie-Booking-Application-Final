import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function TitlebarImageList(props) {    
  return (       
    <ImageList  sx={{ width: '120%', height: 380, gridAutoFlow: 'column'}} cols={6} >      
      {
      props.movieData.map((item) => (
        <ImageListItem key={item.id}>
          <img          
            src={`${item.poster_url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.poster_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}           
          />
        </ImageListItem>
      ))}
    </ImageList>    
  );
}