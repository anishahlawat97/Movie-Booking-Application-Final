import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import { getFilteredMovies } from '../../API';


export default function StandardImageList(props) {
  const [movieList, setmovieList] = React.useState(props.movieData);  
  const [filteredList, setFilteredList] = React.useState(movieList);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    
    getFilteredMovies(props.filterState)
    .then(response => response.json())
    .then(response => setFilteredList(response.movies))
  }, [props.filterState])

  function imageClickHandler(){
    props.imageOnClick(true)
  }
 
  return (    
    <ImageList sx={{ width: '76%', flexDirection: 'row', mt: '16px', ml: '16px' }} gap={25} cols={4} rowHeight={350} >
      {filteredList && filteredList.length>0?
      filteredList.map((item) => (
        <Link key={item.id} onClick={imageClickHandler} to={`/details/${item._id}`}><ImageListItem  key={item.id} sx={{ cursor: 'pointer' }} >
          <img
            src={`${item.poster_url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.poster_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={"Release Date: " + new Date(item.release_date).toDateString()}     
          />
        </ImageListItem>
        </Link>
      )):
      'No data'}
    </ImageList>
  );
}
