import React, { useEffect, useState } from 'react';

import AirportAutocomplete from './components/airport-autocomplete/airport-autocomplete';
import { loadGoogleMapsAPI } from './utils/GoogleMapsUtils';
import './App.css';

function App(): any {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    const googleMapScript = loadGoogleMapsAPI();

    googleMapScript && googleMapScript.addEventListener('load', (): void => setScriptLoaded(true));
  }, []);

  return scriptLoaded && <AirportAutocomplete />;
}

export default App;
