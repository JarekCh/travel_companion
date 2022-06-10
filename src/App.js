import React, {useState ,useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api/travelAdvisorAPI';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {  
  const [places, setPlaces] = useState([]);
  const [childClick, setChildClick] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});  

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });  
  }, []);

  useEffect(() => {    
    setIsLoading(true);

    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {               
        setPlaces(data);
        setIsLoading(false);
      })
  }, [coordinates, bounds]);

  return (
    <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width: "100%" }}>
            <Grid item xs={12} md={4}>
                 <List 
                    places={places}
                    childClick={childClick}
                    isLoading={isLoading}
                 />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                  setCoordinates = {setCoordinates}
                  setBounds = {setBounds}
                  coordinates = {coordinates}
                  places={places}
                  setChildClick={setChildClick}
                /> 
            </Grid>
        </Grid>        
         
    </>  
  );
}

export default App;