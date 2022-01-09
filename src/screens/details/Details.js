import React, {useContext, useState, useEffect} from "react";
import './Details.css';
import { Link, useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import YouTube from "react-youtube";
import StarIcon from './StarRating.js';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AppContext from "../../AppContext";
import Header from "../../common/header/Header";
import { getMovieByID } from "../../API";

function Details() {
    const { id } = useParams();    
    const context = useContext(AppContext);

    const [items, setItems] = useState()

    useEffect(() => {
       getMovieByID(id)
       .then(response => response.json())
       .then(response => setItems(response))
    }, [])

    const opts = {
        height: '420',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

     const videoOnReady =(e) =>{
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
        
      }
      const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

      const bookClickHandler = () =>{
          context.setBookShowValue(false);
      }

    return (
        <>   <Header/>        
            <div id="main-container">
                {
                items && items
                    .map(item => (                           
                        <div id="threeDivs" key={item.id}>                       
                            <div id="left">
                                <Typography sx={{ mt: '8px', ml: '24px', mb: '0px', height: '24px', cursor: 'pointer' }}>
                                    <Link onClick={bookClickHandler} to='/' className="backLink"> &lt; Back To Home </Link>
                                </Typography>
                                <img id='poster' src={item.poster_url} height={326} width={220} alt='movie poster'/>                                    
                            </div>
                            <div id="middle">
                                <Typography variant="headline"><h2>{item.title}</h2></Typography>
                                <Typography sx={{fontWeight: 'bold'}}>Genre: <span className="sub-headings">{item.genres.map(item2 =>  item2+" ")}</span></Typography>
                                <Typography sx={{fontWeight: 'bold'}}>Duration: <span className="sub-headings">{item.duration+" min"}</span></Typography>
                                <Typography sx={{fontWeight: 'bold'}}>Release Date: <span className="sub-headings">{new Date(item.release_date).toDateString()}</span></Typography>
                                <Typography sx={{fontWeight: 'bold'}}>Rating: <span className="sub-headings">{item.critics_rating}</span></Typography>
                                <Typography sx={{fontWeight: 'bold', mt: '16px'}}>Plot: <span className="sub-headings"><a href={item.wiki_url} target='_blank'>(Wiki Link)</a> {item.storyline}</span></Typography>
                                <Typography sx={{fontWeight: 'bold', mt: '16px'}}>Trailer: </Typography> 
                                <YouTube id="trailer" videoId={youtube_parser(item.trailer_url)} opts={opts} onReady={(e)=>videoOnReady(e)} />  
                            </div>
                            <div id="right">
                                <Typography sx={{mt: '8px', fontWeight: 'bold'}}>Rate this movie: </Typography><StarIcon/>
                                <Typography sx={{fontWeight: 'bold', mt: '16px', mb: '16px'}}>Artists: </Typography> 
                                { /* Image list for the artists*/ }           
                                <ImageList sx={{width: 350, height: 250, gridAutoFlow: 'column',  }} gap={15} cols={2}> 
                                    {item.artists.map(item2 => (                                                           
                                    <ImageListItem sx={{border: '5px solid #FF7F7F', boxShadow: '0px 5px 10px'}} key={item2.id}>
                                    <img className="posterImage"
                                        src={`${item2.profile_url}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item2.profile_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item2.first_name+" "+ item2.last_name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item2.first_name+" "+ item2.last_name}                                                                                
                                    />
                                    </ImageListItem>
                                    ))}                                
                                </ImageList>                                
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
export default Details;
