import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import pages from "./pages";
import { useDarkModeContext } from "./context/DarkModeProvider.jsx";

const App = () => {
  const { darkMode } = useDarkModeContext();

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  useEffect(() => {
    console.log("no update?");
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : null}>
      <div className="dark:bg-zinc-900">
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
      </div>
    </div>
  );
};

export default App;
