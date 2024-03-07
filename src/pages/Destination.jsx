import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import { DestinationPage } from "../components/DestinationPage";

//////////////////////////////////////

const Destination = () => {

  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <TopNavBar />
      <DestinationPage />
      <BottomNavBar />
      </div>
  );
};

export default Destination;