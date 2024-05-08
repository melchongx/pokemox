import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="font-montserrat flex min-h-screen flex-col text-[#31241e]">
      <Header />

      <main className="flex-grow bg-[#fff2d7] px-12 py-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
