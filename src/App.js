import React, { useEffect, useState } from "react";
import "./App.css";
import { Desktop } from "./components/desktopcomponent";
import {Mobile} from "./components/mobilecomponent";
function App(){
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
       return(
        <div>
              {
        (screenWidth < 800 || (screenHeight > screenWidth)) ? <Mobile className="mobile-component" /> : <Desktop className="desktop-component" />
      }
      </div>
       )
}
export default App