

const client_id = process.env.REACT_APP_URL_CLIENT_ID;
const authority_url = process.env.REACT_APP_URL_AUTHORITY;
const redirect_url = process.env.REACT_APP_URL_REDIRECT_URI;


export const msalConfig = {

    auth: {
      clientId: client_id,
      authority: authority_url, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: redirect_url,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };