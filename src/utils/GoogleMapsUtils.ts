export const loadGoogleMapsAPI = (): HTMLScriptElement | undefined => {
  const mapsURL: string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCbVZ7BPXnVPFN42My50WoP4TQBJQV-z3E";
  const scripts = document.getElementsByTagName('script');

  //Go through existing script tags and return google maps api tag when found
  for(let i = 0; i < scripts.length; i++) {
    if(scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement('script');
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
