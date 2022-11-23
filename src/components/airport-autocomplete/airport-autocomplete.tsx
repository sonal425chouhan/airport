import React, { FC, useEffect, useState } from 'react';

import request from "../../utils/request";
import { getDistanceFromLatLonInKm } from '../../common/CalculateDistance';
import Map from '../map/map';
import MaterialAutocomplete from '../material-autocomplete/material-autocomplete';

interface AutocompleteProps {};

const AirportAutocomplete: FC<AutocompleteProps> = () => {

  const [airports, setAirports] = useState<Airport[]>([]);
  const [selectedAirports, setSelectedAirports] = useState<SelectedAirports>();
  const [distance, setDistance] = useState<number>(0);

  //fetch Airports in USA
  const fetchAirports = async () => {
    try {
      const response = await request('data.json');
      setAirports(response.body);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAirports();
  }, []);

  useEffect(() => {
    if(selectedAirports?.airport1 && selectedAirports?.airport2) {
      const { airport1, airport2 } = selectedAirports;
      const distance = getDistanceFromLatLonInKm(airport1.LATITUDE, airport1.LONGITUDE, airport2.LATITUDE, airport2.LONGITUDE);

      setDistance(distance);
    }
  }, [selectedAirports]);


  const handleChange = (event: React.SyntheticEvent, value: Airport, airport: string) => {
    if(value) {
      setSelectedAirports({...selectedAirports, [airport]: value});
    }
  };

  const getOptionLabel = (params: any) => {
    return `${params.AIRPORT} (${params.IATA})`;
  };

  return (
    <div>
      <h2 className="center">USA Airports Flying Route and Distance</h2>
      <div className="d-flex justify-content mt-10">
        <MaterialAutocomplete id="airport-select-1"
          options={airports}
          onChange={(event, value) => handleChange(event, value, 'airport1')}
          getOptionLabel={getOptionLabel}
          label="Choose Airport 1"
        ></MaterialAutocomplete>
        <MaterialAutocomplete id="airport-select-2"
          options={airports}
          onChange={(event, value) => handleChange(event, value, 'airport2')}
          getOptionLabel={getOptionLabel}
          label="Choose Airport 2"
        ></MaterialAutocomplete>
      </div>

      <p className="center"><span className="bold fs-20">Distance:</span> {distance} Nautical Miles</p>

      {/*Google Map*/}
      <Map mapType={google.maps.MapTypeId.ROADMAP}
        mapTypeControl={true}
        selectedAirports={selectedAirports}/>
    </div>
  );
}

export default AirportAutocomplete;

interface Airport {
  "IATA": string;
  "AIRPORT": string;
  "CITY": string;
  "STATE": string;
  "COUNTRY": string;
  "LATITUDE": number;
  "LONGITUDE": number;
}

interface SelectedAirports {
  [key: string]: Airport;
}
