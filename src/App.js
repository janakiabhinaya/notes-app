import React from "react";
import "./App.css";
import { Desktop } from "./components/desktopcomponent";
import {Mobile} from "./components/mobilecomponent";
function App(){
       return(
        <div>
      <Desktop className="desktop-component" />
      <Mobile className="mobile-component" />
      </div>
       )
}
export default App