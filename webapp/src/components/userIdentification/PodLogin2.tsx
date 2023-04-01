import React, { useState } from "react";
import {
  LoginButton,
  LogoutButton,
  SessionProvider,
  useSession,
} from "@inrupt/solid-ui-react";
import { Session } from "@inrupt/solid-client-authn-browser";

export function PodLogin() {

  const { session } = useSession();

  const handleLogin = () => {
    console.log("s1: " + session)
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
