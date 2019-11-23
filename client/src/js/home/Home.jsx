import React from "react";
import { authenticationService } from "src/js/services";

export function Home(props) {
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={authenticationService.logout}>LogOut</button>
    </div>
  );
}
