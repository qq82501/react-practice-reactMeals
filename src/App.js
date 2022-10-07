import React, { useState, useEffect, useCallback, useContext } from "react";
import Context from "./store/context";
import "./App.css";
import Header from "./components/Header/Header";
import Introduction from "./components/Introduction/Introduction";
import List from "./components/UI/List";
import MenuItem from "./components/Menu/MenuItem";
import MyCart from "./components/Cart/MyCart";
import Modal from "./components/UI/Modal";

function App() {
  const context = useContext(Context);

  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState();

  const fetchMenu = useCallback(async function () {
    const res = await fetch(
      "https://reactmeals-c7491-default-rtdb.firebaseio.com/menu.json"
    );
    if (!res.ok) throw new Error("HTTP request failed, please refresh again");
    const data = await res.json();

    let menu = [];
    for (const key in data) {
      menu.push({ id: key, ...data[key] });
    }
    setMenu(menu);
    setIsLoading(false);
    setTimeout(() => {
      //slide-in effect
      document.querySelector(".list__menu").classList.add("active");
    }, 500);
  }, []);

  useEffect(() => {
    fetchMenu().catch((err) => setFetchError(err.message));
  }, [fetchMenu]);

  /* Helper ------------------- */
  const menuItems = menu.map((meal) => {
    return (
      <MenuItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let menuContent = menuItems;
  if (isLoading) menuContent = <p className="loading">loading...</p>;
  if (fetchError) menuContent = <p className="error">{fetchError}</p>;

  /* Component Return ------------------- */
  return (
    <div className="container__app">
      {context.isModalOpen && <Modal overlap={<MyCart />} />}
      <Header onModalOpenControl={context.onModalOpen} />
      <main className="container__main">
        <Introduction />
        <List className={`list__menu`}>{menuContent}</List>
      </main>
    </div>
  );
}

export default App;
