import Consumables from "./Consumables/Consumables";
import Header from "./Header/Header";
import TurnYourDeviceOverlay from "./TurnYourDeviceOverlay/TurnYourDeviceOverlay";

export default function Home() {
  return (
    <main className="dark:bg-[#1c1c1c]">
      <TurnYourDeviceOverlay />
      <Header />
      <Consumables />
    </main>
  );
}
