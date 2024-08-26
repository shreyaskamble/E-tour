// import Footer from "../Components/Footer";
import Card from "../Components/Card";
import { useRef,useEffect } from "react";
import CardPage from "../Components/CardPage";

function Home() {
    const homeRef = useRef(null);
    useEffect(() => {
        if (homeRef.current) {
          homeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Or use homeRef.current.focus() if focusing on an element is more appropriate
        }
      }, []);
    return (
        <>   
        <div ref={homeRef} tabIndex="-1" style={{ padding: '20px' }}>
          <CardPage/>
        {/* <Card /> */}
    
    </div>
           
           
        </>
    );
}

export default Home;
