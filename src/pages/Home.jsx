import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import { MatchPage } from "../components/MatchPage";

//////////////////////////////////////

const Home = () => {

  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <TopNavBar />
      <MatchPage/>
      <BottomNavBar />
    </div>
  );
};

export default Home;