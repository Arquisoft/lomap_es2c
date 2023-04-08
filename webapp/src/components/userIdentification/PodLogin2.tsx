import React, { useState } from "react";
import {
  LoginButton,
  LogoutButton,
  SessionProvider,
  useSession,
} from "@inrupt/solid-ui-react";
import PodManager from "podManager/PodManager";
import { Group, Place, User } from "shared/shareddtypes";
import { MapManager } from "podManager/MapManager";

const pod = new PodManager()
const map = new MapManager()

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
    name: "MiGrupo2",
    places: [
      {
        nombre: "Madrid",
        category: "Ciudad",
        longitude: "-3.7038",
        latitude: "40.4168",
        description: "Madrid es la capital de España y una de las ciudades más importantes de Europa.",
        reviewScore: "4.5",
        date: "2022-03-01",
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
        ]
      },
      {
        nombre: "La Bodega",
        category: "Bar",
        longitude: "-3.7044",
        latitude: "40.4169",
        description: "Un bar con mucho ambiente y buena música",
        reviewScore: "4.2",
        date: "2022-03-02",
        comments: [
          {
            author: "Pablo",
            comment: "La Bodega es uno de mis bares favoritos en Madrid. La música siempre es buena y la gente muy amable.",
            date: "2022-03-10"
          },
          {
            author: "Luisa",
            comment: "El ambiente en La Bodega es increíble, siempre hay gente animada y con ganas de pasarlo bien.",
            date: "2022-03-17"
          }
        ]
      },
      {
        nombre: "La Pedriza",
        category: "Ruta de montaña",
        longitude: "-3.8555",
        latitude: "40.8239",
        description: "Una ruta de montaña muy popular en la Sierra de Guadarrama",
        reviewScore: "4.8",
        date: "2022-03-05",
        comments: [
          {
            author: "Mario",
            comment: "La Pedriza es una ruta de montaña impresionante. Las vistas son espectaculares y el paisaje es precioso.",
            date: "2022-03-12"
          },
          {
            author: "Sara",
            comment: "La Pedriza es una ruta bastante exigente, pero merece la pena el esfuerzo. El paisaje es único y muy bonito.",
            date: "2022-03-19"
          }
        ]
      }
    ]
  };
  

  const user: User = {
    username: "",
    password: "",
    webID: "",
    img: "",
    description: ""
  }



  const handleLogin = () => {
    console.log("s1: " + session)

    // pod.getGroups(session).then((groups: Group[]) => {
    //   console.log(groups)
    //   groups.forEach((groupp: Group) => {
    //     console.log(group)
    //   })
    // })

    // map.añadirLugarAGrupo(place1, group, session).then((group: Group) => {
    //   console.log(group)
    // })

    // map.crearGrupo("nuevoGrupo", session)

    // map.eliminarLugarDeGrupo(place1, group, session)

    // map.aplicarFiltro(group, "Ciudad", session).then((places: Place[]) => {
    //   places.forEach((place : Place) => {
    //     console.log(place)
    //   })
    // })

    // map.eliminarGrupo(group, session)

    //pod.savePlace(session, place1);
    // pod.saveGroup(session, group);
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
