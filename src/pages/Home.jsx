import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import { MatchPage } from "../components/MatchPage";
import { DestinationPage } from "../components/DestinationPage";

//////////////////////////////////////

const Home = () => {

  return (
    <div className="h-screen flex flex-col">
      <TopNavBar />
      {/* <MatchPage/> */}
      <DestinationPage />
      <BottomNavBar />
      </div>
  );
};

export default Home;