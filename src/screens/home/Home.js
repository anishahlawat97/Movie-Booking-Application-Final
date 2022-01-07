import React from "react";
import { Component } from "react";
import './Home.css';
import MovieData from '../../common/moviesData.js';
import ImageList from './ImageList.js';
import RegularImageList from './RegularImageList';
import FilterCard from './FilterCard.js';
import AppContext from "../../AppContext";


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            movieName: '',
            genreName: [],
            personName: [],           
            startDate: '',
            endDate: '' ,
            name: ''                  
        };
        this.setState= this.setState.bind(this);
    }
    static contextType = AppContext;

    
    render(){
        return <div>                    
                    <div className="heading">
                        <span>Upcoming Movies</span>                        
                    </div>
                    <div className="imageListDiv">
                        <ImageList className="imageList" movieData={MovieData}/>
                    </div>
                    <div className="flex-container">
                        <div className="left">
                           <RegularImageList imageOnClick={this.context.setBookShowValue} filterState={this.state} movieData={MovieData}/>
                        </div>
                        <div className="right">
                            <FilterCard  setFilterState={this.setState}/>
                        </div>
                    </div>
               </div>
    }
}

export default Home;