import React, {useState, useEffect} from 'react';
import {CssBaseline, Grid} from "@material-ui/core"

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

import  {getPlacesData} from "./api"

function App() {
  const [places, setPlaces] = useState([])
  const [coordinate, setCoordinate] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")
  const [isLoading, setisLoading] = useState(false);
  const [filterPlaces, setFilterPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinate({ lat: latitude, lng: longitude });
    });
  }, []);

  console.log(coordinate);
  
  useEffect(() => {
    const filterPlace =  places?.filter((place) => place.rating > rating)
    setFilterPlaces(filterPlace)
  },[rating, places])

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setisLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
          setFilterPlaces([])
          setisLoading(false)
      })
    }
    
  }, [bounds, type])

  

  return (
    <>
      <CssBaseline />
      <Header setCoordinate={setCoordinate}/>
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
            <List  
              places={filterPlaces?.length ? filterPlaces :  places}  
              childClicked={childClicked} 
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
        </Grid>
        <Grid item xs={12} md={8}>
            <Map 
              setCoordinate={setCoordinate}
              setBounds={setBounds}
              coordinate={coordinate}
              places={filterPlaces?.length ? filterPlaces :  places}
              setChildClicked={setChildClicked}
              
            />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
