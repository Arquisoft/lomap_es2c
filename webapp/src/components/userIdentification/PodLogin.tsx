import React, { useState } from "react";
import {
  LoginButton,
  LogoutButton,
  SessionProvider,
  useSession,
} from "@inrupt/solid-ui-react";
import { Session } from "@inrupt/solid-client-authn-browser";
import { login, loginPod } from "api/api";
import { User } from "../../../../restapi/src/facade";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import PodManager from "podManager/PodManager";
import { Group, Place } from "shared/shareddtypes";

export default function PodLogin() {

  const pod = new PodManager()
  const { session } = useSession();

  const handleLogin = () => {
    console.log("s1: " + session)
  };

  console.log(session)
  
  const handleLogout = () => {
    
  };
  const navigate = useNavigate();
  
  
  
  const tryLogin = async () => {
    let place:Place = {"nombre":"Prueba", "latitude": "1", "longitud":"2"}
    let place2:Place = {"nombre":"Oviedo", "latitude": "1", "longitud":"2"}
    let group:Group = {
      "nombre": "Grupo",
      places: [place, place2]
    }

    // pod.saveGroup(session, group)

    // let user = {"username":"username", "password":"password", "webID":"webID"}
    // console.log("Aquí")
    // console.log("Allá")
    
    // pod.savePlace(session, {"nombre":"Prueba", "latitude": "1", "longitud":"2"})

    // console.log(session.info.isLoggedIn) 
    
    console.log(2)

    let places = await pod.getPlaces(session)

    places.forEach((place: any) => {
       console.log(place)
    })

    console.log(places)
  }


  return (
    <SessionProvider>
      <div>
        {!session.info.isLoggedIn ? (
          <LoginButton
            oidcIssuer="https://inrupt.net"
            redirectUrl={window.location.href}
           
          > 
          <button onClick={tryLogin}> inicia sesion</button>
          </LoginButton>
        ) : (
          <LogoutButton>
            <button onClick={handleLogout}> cierra sesion</button>
          </LogoutButton>
        )}
      </div>
    </SessionProvider>
  );
}
