import React, { useMemo, useState, useEffect } from 'react';
import TopButtons from "../../components/TopButtons/TopButtons.js"
import "./Map.css"
import "../../index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { getUserLocation } from "../../utils/utils.js"
import { Link } from 'react-router-dom';

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-o5rhMpVLpjZBFyx_pVkE3OPhYCYR4Jk",
  });
  const navigate = useNavigate();
  const center = useMemo(() => ({ lat: 39.012666, lng: -8.974542 }), []);
  const [options, setOptions] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isUserPresent, setIsUserPresent] = useState(false);

  const swLat = 39.010969;
  const swLng = -8.979158;
  const neLat = 39.013578;
  const neLng = -8.972700;

  useEffect(() => {
    if (isLoaded) {
      const southwest = new window.google.maps.LatLng(swLat, swLng);
      const northeast = new window.google.maps.LatLng(neLat, neLng);
      const newBounds = new window.google.maps.LatLngBounds(southwest, northeast);
      setOptions({
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        restriction: {
          latLngBounds: newBounds,
          strictBounds: false
        }
      });
    } else {
      //getUserCurrentLocation()
      setOptions({
        mapTypeId: 'satellite',
        disableDefaultUI: true,
      });
    }
  }, [isLoaded]);

  /*const getUserCurrentLocation = () => {
    if (navigator.geolocation) {
          var coordinates = getUserLocation();
          setUserLocation(coordinates);
          var isUser = isUserWithinBounds(coordinates);
          console.log(isUser)
          setIsUserPresent(isUser);
    }
  };

  const isUserWithinBounds = (userLocation) => {
    return (
      userLocation.lat >= swLat &&
      userLocation.lat <= neLat &&
      userLocation.lng >= swLng &&
      userLocation.lng <= neLng
    );
  };*/

  return (
    <div className="Map">
      <TopButtons backUrl={"/MonteDosCastelinhosWebAR"} />
      <div className="content">
        <div className='MainMap'>
          <img className='mainMapImage' src={process.env.PUBLIC_URL + "/images/map_smaller.jpg"} />
          <Link to={'/MonteDosCastelinhosWebAR/sondagem4/'} className="nav-link">
            <button className='mapPoint mainMapPoint4'>
              <img className='mapPoints' src={process.env.PUBLIC_URL + "/images/MapPoints/point4.png"} />
            </button>
          </Link>
          <Link to={'/MonteDosCastelinhosWebAR/sondagem5/'} className="nav-link">
            <button className='mapPoint mainMapPoint5'>
              <img className='mapPoints' src={process.env.PUBLIC_URL + "/images/MapPoints/point5.png"} />
            </button>
          </Link> 
          <Link to={'/MonteDosCastelinhosWebAR/sondagem8/'} className="nav-link">
            <button className='mapPoint mainMapPoint8'>
              <img className='mapPoints' src={process.env.PUBLIC_URL + "/images/MapPoints/point8.png"} />
            </button>
          </Link>
        </div>
        {/*!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="mapContainer"
            center={center}
            zoom={19}
            options={options}>
            {/*<MarkerF
              position={{ lat: 39.011974, lng: -8.974278 }}
              icon={{
                url: (process.env.PUBLIC_URL + "/images/MapPoints/point8.png"),
                scaledSize: new window.google.maps.Size(64, 64),
              }}
              onClick={() => navigate('/MonteDosCastelinhosWebAR/sondagem8')}
            />
            <MarkerF
              position={{ lat: 39.012666, lng: -8.974542 }}
              icon={{
                url: (process.env.PUBLIC_URL + "/images/MapPoints/point4.png"),
                scaledSize: new window.google.maps.Size(64, 64),
              }}
              onClick={() => navigate('/MonteDosCastelinhosWebAR/sondagem4')}
            />
            <MarkerF
              position={{ lat: 39.011755, lng: -8.973840 }}
              icon={{
                url: (process.env.PUBLIC_URL + "/images/MapPoints/point5.png"),
                scaledSize: new window.google.maps.Size(64, 64),
              }}
              onClick={() => navigate('/MonteDosCastelinhosWebAR/sondagem5')}
            />}
            {isUserPresent && userLocation && false &&
              <MarkerF position={{ lat: userLocation.lat, lng: userLocation.lng }} />}
          </GoogleMap>
            )*/}
      </div >
      <button className="locationBtn roundBtn">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
}
export default Map;