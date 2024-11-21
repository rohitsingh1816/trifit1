import { useEffect } from "react";
import Card from "./context";

function Home(){
  return (
    <div className="bg-primary text-white w-100 min-vh-100 d-flex align-items-center justify-content-center">
<Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
    </div>
    
  );  
}

export default Home;