import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./routes/Home.jsx";
import Projects from "./routes/Projects.jsx";
import Collaborate from "./routes/Collaborate.jsx";
import WildfireTopographicMap from "./routes/projects/WildfireTopographicMap.jsx";
import ThreeDPrintedJoystick from "./routes/projects/ThreeDPrintedJoystick.jsx";
import RoboticArm from "./routes/projects/RoboticArm.jsx";
import CustomCatanBoard from "./routes/projects/CustomCatanBoard.jsx";
import RepurposedSawbladeArt from "./routes/projects/RepurposedSawbladeArt.jsx";
import BrassCoins from "./routes/projects/BrassCoins.jsx";
import FoamCncBoat from "./routes/projects/FoamCncBoat.jsx";
import RabbitCageLatch from "./routes/projects/RabbitCageLatch.jsx";
import CncRouterWoodExperiments from "./routes/projects/CncRouterWoodExperiments.jsx";
import QueenOfHearts from "./routes/projects/QueenOfHearts.jsx";
import FoldingNapPod from "./routes/projects/FoldingNapPod.jsx";
import TrashcanBackboard from "./routes/projects/TrashcanBackboard.jsx";
import WaterbottleStickers from "./routes/projects/WaterbottleStickers.jsx";
import SilverwareOrganizer from "./routes/projects/SilverwareOrganizer.jsx";
import ManCaveSign from "./routes/projects/ManCaveSign.jsx";
import CollegiateCoasters from "./routes/projects/CollegiateCoasters.jsx";
import StrandbeestLinkage from "./routes/projects/StrandbeestLinkage.jsx";
import BombDisarmingRobot from "./routes/projects/BombDisarmingRobot.jsx";
import TheBestCheeseburgerFries from "./routes/projects/TheBestCheeseburgerFries.jsx";
import Dunking from "./routes/projects/Dunking.jsx";
import BajaSaeKart from "./routes/projects/BajaSaeKart.jsx";
import NotFound from "./routes/NotFound.jsx";
import "./App.css";

const projectRoutes = [
  { path: "project/wildfire-topographic-map", Component: WildfireTopographicMap },
  { path: "project/3d-printed-joystick", Component: ThreeDPrintedJoystick },
  { path: "project/robotic-arm", Component: RoboticArm },
  { path: "project/custom-catan-board", Component: CustomCatanBoard },
  { path: "project/repurposed-sawblade-art", Component: RepurposedSawbladeArt },
  { path: "project/brass-coins", Component: BrassCoins },
  { path: "project/foam-cnc-boat", Component: FoamCncBoat },
  { path: "project/rabbit-cage-latch", Component: RabbitCageLatch },
  { path: "project/cnc-router-wood-experiments", Component: CncRouterWoodExperiments },
  { path: "project/queen-of-hearts", Component: QueenOfHearts },
  { path: "project/folding-nap-pod", Component: FoldingNapPod },
  { path: "project/trashcan-backboard", Component: TrashcanBackboard },
  { path: "project/waterbottle-stickers", Component: WaterbottleStickers },
  { path: "project/silverware-organizer", Component: SilverwareOrganizer },
  { path: "project/man-cave-sign", Component: ManCaveSign },
  { path: "project/collegiate-coasters", Component: CollegiateCoasters },
  { path: "project/strandbeest-linkage", Component: StrandbeestLinkage },
  { path: "project/bomb-disarming-robot", Component: BombDisarmingRobot },
  { path: "project/the-best-cheeseburger-fries", Component: TheBestCheeseburgerFries },
  { path: "project/dunking", Component: Dunking },
  { path: "project/baja-sae-kart", Component: BajaSaeKart },
];

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="collaborate" element={<Collaborate />} />
          {projectRoutes.map(route => (
            <Route key={route.path} path={route.path} element={<route.Component />} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
