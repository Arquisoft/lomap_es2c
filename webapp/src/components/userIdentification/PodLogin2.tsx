import React, { useState } from "react";
import {
  LoginButton,
  LogoutButton,
  SessionProvider,
  useSession,
} from "@inrupt/solid-ui-react";
import PodManager from "podManager/PodManager";
import { Group, Place } from "shared/shareddtypes";

const pod = new PodManager()

export function PodLogin() {

  const { session } = useSession();

  const place1: Place = {
    latitude: "40.4168",
    longitude: "-3.7038",
    nombre: "Madrid",
    category: "Ciudad",
    description: "Madrid es la capital de España y una de las ciudades más importantes de Europa.",
    comments: [
      {
        author: "Ana",
        comment: "Me encanta Madrid, es una ciudad muy animada y llena de vida.",
        date: "2022-03-15"
      },
      {
        author: "Juan",
        comment: "Madrid tiene una oferta cultural muy amplia, siempre hay algo interesante que hacer.",
        date: "2022-03-20"
      }
    ],
    reviewScore: "4.5",
    date: "2022-03-01"
  };
  
  const place2: Place = {
    latitude: "51.5074",
    longitude: "-0.1278",
    nombre: "Londres",
    category: "Ciudad",
    description: "Londres es la capital del Reino Unido y una de las ciudades más visitadas del mundo.",
    comments: [
      {
        author: "Maria",
        comment: "Londres es una ciudad increíble, llena de historia y cultura.",
        date: "2022-02-28"
      },
      {
        author: "Pedro",
        comment: "Me gustó mucho la experiencia de subir al London Eye, las vistas son impresionantes.",
        date: "2022-03-05"
      },
      {
        author: "Laura",
        comment: "Lo que más me gustó de Londres fue la oferta gastronómica, hay opciones para todos los gustos.",
        date: "2022-03-10"
      }
    ],
    reviewScore: "4.8",
    date: "2022-02-15"
  };

  const group: Group = {
    nombre: "MiGrupo",
    places: [place1, place2]
  }
  

  const handleLogin = () => {
    console.log("s1: " + session)

    //pod.savePlace(session, place1);
    pod.saveGroup(session, group);
  };

  console.log(session)

  const handleLogout = () => {
    console.log("sale sesion")
  };


  return (
    <SessionProvider>
      <div>
        {!session.info.isLoggedIn ? (
          <LoginButton
            oidcIssuer="https://inrupt.net"
            redirectUrl={window.location.href}
           
          > 
          <button onClick={handleLogin}> inicia sesion</button>
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
