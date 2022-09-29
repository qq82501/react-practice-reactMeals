## ReactMeals

A virtual meal ordering site.

## Functionality

1. Add / Remove items

  The Hooks I used:

      useContext: gathering cart related data and provide to all of components, they can reach context easily.
      useEffect: Fetching data from localstorage in first render, and adding animation on cart button when amount of items changes.
      useReducer: any update in cart will also update miltiple state (cartItems, orderAmount), to help us clean up the code, take advantage of useReducer.
      useState: controll simple state change.

2. Storage data into localStorage
3. RWD design so you can use on any device.
