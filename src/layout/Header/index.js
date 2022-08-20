import NavBar from "../../components/NavBar";
import NavDrawer from "../../components/NavDrawer";

export default function Header({ handleDrawer }) {
  return (
    <>
      <NavBar />
      <NavDrawer handleDrawer={handleDrawer} />
    </>
  );
}
