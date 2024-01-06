import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT } from "../config/env";

export const useMobile = () => {

  const [mobile, setMobile] = useState(false);

  const handleResize = () => {
    if(window.innerWidth <= MOBILE_BREAKPOINT){
      setMobile(true);
    }
    else setMobile(false);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); }
  }, []);

  return mobile;
}