import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AirportAutocomplete from './airport-autocomplete';

window['google'] = {
  maps: {
    MapTypeId: Map,
    Marker: class{},
    Polyline: class{},
    LatLng: class{},
    Map: class{},
  }
} as any;

describe('<AirportAutocomplete />', () => {
  test('it should mount', () => {
    render(<AirportAutocomplete />);
    
    const airportAutocomplete = document.getElementById('airport-select-1');

    expect(airportAutocomplete).toBeInTheDocument();
  });
});
