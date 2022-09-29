import React, { useEffect, useReducer } from "react";

const Context = React.createContext({
  orderAmount: 0,
  cartItems: [],
  onAdd: function (item) {},
  onRemove: function (item) {},
});

const initialState = {
  orderAmount: 0,
  cartItems: [],
};

const reducer = function (state, action) {
  switch (action.type) {
    case "FETCH_FROM_STORAGE":
      return {
        ...state,
        orderAmount: +localStorage.getItem("storageAmount"),
        cartItems: !JSON.parse(localStorage.getItem("storageCartItems"))
          ? []
          : JSON.parse(localStorage.getItem("storageCartItems")),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        orderAmount: state.orderAmount + action.payload.amount,
        cartItems: JSON.parse(localStorage.getItem("storageCartItems")),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        orderAmount: state.orderAmount - 1,
        cartItems: JSON.parse(localStorage.getItem("storageCartItems")),
      };
  }
};

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_FROM_STORAGE" });
  }, []);

  const addToCartHandler = function (newItem) {
    if (typeof newItem.amount !== "number" || newItem.amount < 1) return;

    let [existedItem] = state.cartItems.filter(
      (item) => item.itemNo === newItem.itemNo
    );

    !existedItem || (existedItem.amount += newItem.amount);
    const myCartItems = !existedItem
      ? [...state.cartItems, newItem]
      : [...state.cartItems];

    localStorage.setItem("storageAmount", state.orderAmount + newItem.amount);
    localStorage.setItem("storageCartItems", JSON.stringify(myCartItems));
    dispatch({ type: "ADD_TO_CART", payload: newItem });
  };

  const removeFromCartHandler = function (item) {
    const [updatedItem] = state.cartItems.filter(
      (cartItem) => cartItem.itemNo === item.itemNo
    );
    updatedItem.amount = item.updatedAmount;
    const updatedCartItems = item.updatedAmount
      ? [...state.cartItems]
      : [
          ...state.cartItems.filter(
            (cartItem) => cartItem.itemNo !== item.itemNo
          ),
        ];

    localStorage.setItem("storageAmount", state.orderAmount - 1);
    localStorage.setItem("storageCartItems", JSON.stringify(updatedCartItems));
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  return (
    <Context.Provider
      value={{
        orderAmount: state.orderAmount,
        cartItems: state.cartItems,
        onAdd: addToCartHandler,
        onRemove: removeFromCartHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
