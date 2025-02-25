import Directory from "../../components/directory/directory.component.jsx";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <Outlet />,
    <Directory />
  );
}

export default Home;
