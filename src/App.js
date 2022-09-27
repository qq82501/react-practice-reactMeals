import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import Context from "./store/context";
import Header from "./components/Header/Header";
import Introduction from "./components/Introduction/Introduction";
import List from "./components/UI/List";
import MenuItem from "./components/Menu/MenuItem";
import Modal from "./components/Modal/Modal";

const menu = [
  {
    mealNo: 1,
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    mealNo: 2,
    name: "Schnitzel",
    description: "A german speciality!",
    price: 16.5,
  },
  {
    mealNo: 3,
    name: "Barbecue Burger",
    description: "Amerian, raw, meaty",
    price: 12.99,
  },
  {
    mealNo: 4,
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

  return (
    <div>
      {isModalOpen && <Modal onModalClose={modalCloseHandler} />}
      <Header onModalOpenControl={modalOpenHandler} />
      <main className="container__main">
        <Introduction />
        <List className={`list__menu`}>
          {menu.map((meal) => (
            <MenuItem
              key={meal.mealNo}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </List>
      </main>
    </div>
  );
}

export default App;
