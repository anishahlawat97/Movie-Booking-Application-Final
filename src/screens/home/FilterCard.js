import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, Input, InputLabel, FormControl, Checkbox, TextField, ListItemText } from '@mui/material';
import genre from '../../common/genre';
import artists from '../../common/artists';
import { createTheme } from '@mui/system';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function FilterCard(props) {
    const [personName, setPersonName] = React.useState([]);
    const [genreName, setGenreName] = React.useState([]);
    const [movieName, setMovieName] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

  const handleChange1 = (event) => {
    const { target: { value } } = event;
     setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    return setGenreName(typeof value === 'string' ? value.split(',') : value);
  }

  const nameChangeHandler = (e)=>{
      return setMovieName(e.target.value)
  }

  const dateChangeHandler1 = (e)=>{
      return setStartDate(e.target.value)
  }

  const dateChangeHandler2 = (e)=>{
      return setEndDate(e.target.value)
  }

  const filterClickHandler= (e)=>{
     props.setFilterState({personName: personName,
                           movieName: movieName,
                           genreName: genreName,
                           startDate: startDate,
                           endDate: endDate
                        }) 
  }

  const resetClickHandler = ()=>{
    setPersonName([])
    setMovieName([])
    setGenreName([])
    setStartDate([])
    setEndDate('')
  }

  const theme = createTheme({
      palette: {
          primary:{
                light: '#42a5f5'
          } 
          
      }
  })
    return (
        
        <Card sx={{ minWidth: 240,  m: 4 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14, minWidth: 240, maxWidth: 240}} color={theme.palette.primary.light} gutterBottom>
                    FIND MOVIES BY:
                </Typography>                
                <FormControl sx={{m:theme.spacing(1), minWidth: 240, maxWidth: 240}}>
                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                    <Input onChange={(e)=>nameChangeHandler(e)} id="movieName" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl variant="standard" sx={{ m:theme.spacing(1), minWidth: 240, maxWidth: 240}}>
                    <InputLabel id="demo-simple-select-standard-label">Genre</InputLabel>
                    <Select
                        multiple
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={genreName}
                        renderValue={(selected) => selected.join(', ')}
                        onChange={(e)=>handleChange2(e)}
                    >                       
                        {
                            genre.map((item, index) => {
                                return <MenuItem key={index} value={item.name}>                            
                                            <Checkbox checked={genreName.indexOf(item.name) > -1} key={index} value={item.name}></Checkbox>
                                            <ListItemText primary={item.name} />
                                       </MenuItem>
                            })
                        }

                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m:theme.spacing(1), minWidth: 240, maxWidth: 240}}>
                    <InputLabel id="demo-simple-select-standard-label">Artists</InputLabel>
                    <Select
                        multiple
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={personName}
                        renderValue={(selected) => selected.join(', ')}
                      onChange={(e)=>handleChange1(e)}
                    >                       
                        {
                            artists.map((item, index) => {
                                return <MenuItem key={index} value={item.first_name+" "+item.last_name}>                            
                                            <Checkbox checked={personName.indexOf(item.first_name+" "+item.last_name) > -1} key={index} value={item.first_name+" "+item.last_name}  ></Checkbox>
                                            <ListItemText primary={item.first_name+" "+item.last_name} />
                                       </MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{m:theme.spacing(1), mt:2, minWidth: 240, maxWidth: 240}}>
                    <InputLabel shrink htmlFor='dateStart'>Release Date Start</InputLabel>
                    <TextField onChange={(e)=>dateChangeHandler1(e)} variant='standard' type='date'></TextField>
                </FormControl>    
                <FormControl sx={{m:theme.spacing(1), mt:2, minWidth: 240, maxWidth: 240}}>
                    <InputLabel shrink htmlFor='dateEnd'>Release Date End</InputLabel>
                    <TextField onChange={(e)=>dateChangeHandler2(e)} id='dateEnd'  variant='standard' type='date'></TextField>
                </FormControl>  
                <Button type='submit' onClick={filterClickHandler} fullWidth variant='contained' sx={{mt:2, color: 'primary', minWidth: 240}} >APPLY</Button> 
                <Button type='submit' onClick={resetClickHandler} fullWidth variant='contained' sx={{mt:2, color: 'primary', minWidth: 240}} >RESET</Button>                            
            </CardContent>           
        </Card>           
    );     
}
