import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import { MatchPage } from "../components/MatchPage";
//////////////////////////////////////

const Home = () => {

  return (
    <div className="h-screen flex flex-col">
      <TopNavBar />
      <MatchPage />
      <BottomNavBar />
      </div>
  );
};

export default Home;