import { Outlet } from "react-router-dom";

import Header from "./Components/Header";

import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div className="bg-white sm:bg-red-200 md:bg-green-300 lg:bg-yellow-200 xl:bg-blue-400 2xl:bg-teal-100">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
