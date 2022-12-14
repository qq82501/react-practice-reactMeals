import React, { useEffect, useReducer, useState } from "react";

const Context = React.createContext({
  orderAmount: 0,
  cartItems: [],
  isModalOpen: false,
  onAdd: function (item) {},
  onRemove: function (item) {},
  onReset: function () {},
  onModalOpen: function () {},
  onModalClose: function () {},
});

const initialState = {
  orderAmount: 0,
  cartItems: [],
};

const reducer = function (state, action) {
  switch (action.type) {
    case "FETCH_FROM_STORAGE":
      if (!action.payload || !action.payload.amount) return initialState;

      return {
        ...state,
        orderAmount: action.payload.amount,
        cartItems: action.payload.cartItems,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        orderAmount: action.payload.amount,
        cartItems: action.payload.cartItems,
      };
    case "REMOVE_ITEM":
      if (!action.payload.amount) return initialState;
      return {
        ...state,
        orderAmount: action.payload.amount,
        cartItems: action.payload.cartItems,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartData = async function () {
      const res = await fetch(
        "https://reactmeals-c7491-default-rtdb.firebaseio.com/cart.json"
      );
      const data = await res.json();
      dispatch({ type: "FETCH_FROM_STORAGE", payload: data });
    };
    fetchCartData();
  }, []);

  // --Helper -------------------------------//
  const httpRequest = async function (option, actionType) {
    const res = await fetch(
      "https://reactmeals-c7491-default-rtdb.firebaseio.com/cart.json",
      option
    );
    const data = await res.json();
    dispatch({ type: actionType, payload: data });
  };

  // --Handler -------------------------------//

  const addToCartHandler = function (newItem) {
    if (typeof newItem.amount !== "number" || newItem.amount < 1) return;
    let [existedItem] = state.cartItems.filter(
      (item) => item.itemNo === newItem.itemNo
    );
    existedItem && (existedItem.amount += newItem.amount);

    const myCartItems = !existedItem
      ? [...state.cartItems, newItem]
      : [...state.cartItems];

    const newItemOption = {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: state.orderAmount + newItem.amount,
        cartItems: myCartItems,
      }),
    };

    const exsitedItemOption = {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: state.orderAmount + newItem.amount,
        cartItems: myCartItems,
      }),
    };

    !existedItem && httpRequest(newItemOption, "ADD_TO_CART");
    existedItem && httpRequest(exsitedItemOption, "ADD_TO_CART");
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

    const removeItemOption = {
      method: "PATCH",
      header: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: state.orderAmount - 1,
        cartItems: updatedCartItems,
      }),
    };
    httpRequest(removeItemOption, "REMOVE_ITEM");
  };

  const resetHandler = function () {
    const resetOption = {
      method: "PATCH",
      header: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 0,
        cartItems: [],
      }),
    };
    httpRequest(resetOption, "RESET");
  };

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
    document.body.style.overflow = "unset";
  };

  return (
    <Context.Provider
      value={{
        orderAmount: state.orderAmount,
        cartItems: state.cartItems,
        isModalOpen,
        onAdd: addToCartHandler,
        onRemove: removeFromCartHandler,
        onReset: resetHandler,
        onModalClose: modalCloseHandler,
        onModalOpen: modalOpenHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
