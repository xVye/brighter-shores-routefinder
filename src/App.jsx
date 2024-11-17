import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import pages from "./pages";

const App = () => {
  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  return (
    <HashRouter>
      <Header setMobileMenuShown={setMobileMenuShown} />
      <div className="container mx-auto max-w-[1200px] flex px-3">
        <Navigation
          mobileMenuShown={mobileMenuShown}
          setMobileMenuShown={setMobileMenuShown}
        />
        <Routes>
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={React.createElement(page.component)}
            />
          ))}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
