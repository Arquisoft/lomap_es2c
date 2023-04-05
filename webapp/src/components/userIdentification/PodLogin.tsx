import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';



export function PodLogin() {
// Aplicación registrada como lomap_es2c
const clientId = '41a42149-9d68-4bdb-b51d-b490a6006855';
const clientSecret = '3f0e51c2-31b6-49fb-a714-a108f73cad39';

const redirectUri = 'https://localhost:3000';

// Proveedor por defecto
const authorizationEndpoint = 'https://inrupt.net/authorize';
const tokenEndpoint = 'https://inrupt.net/token';

// Permisos
const scope = 'openid%20profile%20read%20write';
const responseType = 'code';

const [accessToken, setAccessToken] = useState<string>('');

  const handleAuthorization = () => {

    const state = Math.random().toString(36).substring(7);
    
    const authorizationUrl = `${authorizationEndpoint}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    console.log(authorizationUrl)
    window.location.href = authorizationUrl;
    
  };

  const handleGetAccessToken = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlSearchParams.get('code');

    if (!authorizationCode) {
      console.error("Error: no se ha generado el código de autorización");
      return;
    }

    try {

      const tokenResponse = await axios.post(tokenEndpoint, {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
      });

      setAccessToken(tokenResponse.data.access_token);
    } catch (error) {
      console.error('Error token de acceso:', error);
    }
  };

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleAuthorization}>Dar permisos</button>
      ) : (
        <p>Token: {accessToken}</p>
      )}
      {window.location.pathname === '/' && (
        <button onClick={handleGetAccessToken}>Obtener token</button>
      )}
    </div>
  );
}
