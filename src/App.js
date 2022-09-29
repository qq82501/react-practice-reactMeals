import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Introduction from "./components/Introduction/Introduction";
import List from "./components/UI/List";
import MenuItem from "./components/Menu/MenuItem";
import MyCart from "./components/Cart/MyCart";
import Modal from "./components/UI/Modal";
const menu = [
  {
    mealNo: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    mealNo: "m2",
    name: "Schnitzel",
    description: "A german speciality!",
    price: 16.5,
  },
  {
    mealNo: "m3",
    name: "Barbecue Burger",
    description: "Amerian, raw, meaty",
    price: 12.99,
  },
  {
    mealNo: "m4",
    name: "Green Bowl",
    description: "Healthy... and green...",
    price: 18.99,
  },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".list__menu").classList.add("active");
    }, 1000);
  }, []);

  const modalOpenHandler = function () {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const modalCloseHandler = function (e) {
    if (
      !e.target.closest(".btn__modal_close") &&
      !e.target.classList.contains("modal")
    )
      return;
    setIsModalOpen(false);
    document.body.style.overflow = "initial";
  };
  /* Helper ------------------- */
  const menuItems = menu.map((meal) => {
    return (
      <MenuItem
        key={meal.mealNo}
        id={meal.mealNo}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  /* Component Return ------------------- */
  return (
    <div className="container__app">
      {isModalOpen && (
        <Modal overlap={<MyCart onModalClose={modalCloseHandler} />} />
      )}
      <Header onModalOpenControl={modalOpenHandler} />
      <main className="container__main">
        <Introduction />
        <List className={`list__menu`}>{menuItems}</List>
      </main>
    </div>
  );
}

export default App;
