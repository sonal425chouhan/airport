import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MaterialAutocomplete from './material-autocomplete';

const mockHandleChange = (event: React.SyntheticEvent, value: any) => {
  if(value) {
  }
};

const mockGetOptionLabel = (params: any) => {
  return `${params.AIRPORT} (${params.IATA})`;
};

const mockOptions = [
  {
    airport1: {"IATA":"ATL","AIRPORT":"William B Hartsfield-Atlanta Intl","CITY":"Atlanta","STATE":"GA","COUNTRY":"USA","LATITUDE":33.64044444,"LONGITUDE":-84.42694444},
    airport2: {"IATA":"AUS","AIRPORT":"Austin-Bergstrom International","CITY":"Austin","STATE":"TX","COUNTRY":"USA","LATITUDE":30.19453278,"LONGITUDE":-97.66987194}
  }
];

describe('<MaterialAutocomplete />', () => {
  test('it should mount', () => {
    render(<MaterialAutocomplete onChange={mockHandleChange}
        getOptionLabel={mockGetOptionLabel}
        label="Choose an airport"
        id="airport-select-1"
        options={mockOptions}
        />);
    
    const materialAutocomplete = document.getElementById('airport-select-1');

    expect(materialAutocomplete).toBeInTheDocument();
  });
});
