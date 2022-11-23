import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Map from './map';

window['google'] = {
  maps: {
    MapTypeId: Map,
    LatLng: class{},
    Marker: class{},
    Polyline: class{
      setPath() {};
      setMap() {};
    },
    Map: class{},
  }
} as any;

const mockSelectedAirports = {
  airport1: {
    "IATA":"ATL",
    "AIRPORT":"William B Hartsfield-Atlanta Intl",
    "CITY":"Atlanta","STATE":"GA","COUNTRY":"USA",
    "LATITUDE":33.64044444,
    "LONGITUDE":-84.42694444
  },
  airport2: {
    "IATA":"AUS",
    "AIRPORT":"Austin-Bergstrom International",
    "CITY":"Austin",
    "STATE":"TX",
    "COUNTRY":"USA",
    "LATITUDE":30.19453278,
    "LONGITUDE":-97.66987194
  }
}

describe('<Map />', () => {
  test('it should mount', () => {
    render(<Map mapType={google.maps.MapTypeId.ROADMAP}
              mapTypeControl={true}
              selectedAirports={mockSelectedAirports}/>);
    
    const map = document.getElementById('map');

    expect(map).toBeInTheDocument();
  });
});
