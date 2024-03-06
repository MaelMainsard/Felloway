import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import { DestinationPage } from "../components/DestinationPage";

//////////////////////////////////////

const Destination = () => {

  return (
    <div className="h-screen flex flex-col">
      <TopNavBar />
      <DestinationPage />
      <BottomNavBar />
      </div>
  );
};

export default Destination;