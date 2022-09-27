import React, { useState, useEffect } from "react";

const Context = React.createContext({
  orderAmount: 0,
  cartItems: [],
  onAdd: function () {},
  onUpdateItem: function () {},
});

export function ContextProvider(props) {
  const [orderAmount, setOrderAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setOrderAmount(+localStorage.getItem("storageAmount"));
    setCartItems(
      JSON.parse(!localStorage.getItem("storageCartItems"))
        ? []
        : JSON.parse(localStorage.getItem("storageCartItems"))
    );
  }, []);

  const updateCart = function (item) {
    if (typeof item.amount !== "number" || item.amount < 1) return;
    setOrderAmount((prevState) => {
      return prevState + item.amount;
    });
    setCartItems((prevState) => {
      return [
        ...prevState,
        {
          name: item.name,
          price: item.price,
          itemNo: item.itemNo,
          amount: item.amount,
        },
      ];
    });
  };

  const updateCartItemAmount = function (item) {
    if (item.action === "minus")
      localStorage.setItem("storageAmount", +orderAmount - 1);

    if (item.action === "plus")
      localStorage.setItem("storageAmount", +orderAmount + 1);

    setOrderAmount(+localStorage.getItem("storageAmount"));

    setCartItems((prevState) => {
      const [updatedItem] = prevState.filter(
        (cartItem) => cartItem.itemNo === item.itemNo
      );

      updatedItem.amount = item.updatedAmount;
      const updatedCartItems = item.updatedAmount
        ? [...prevState]
        : [...prevState.filter((cartItem) => cartItem.itemNo !== item.itemNo)];
      localStorage.setItem(
        "storageCartItems",
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  return (
    <Context.Provider
      value={{
        orderAmount: orderAmount,
        cartItems: cartItems,
        onAdd: updateCart,
        onUpdateItem: updateCartItemAmount,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
