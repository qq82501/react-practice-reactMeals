## ReactMeals

A virtual meal ordering site.

## Functionality

1. Add / Remove items

   - The Hooks I used:

     - useContext: gathering cart related data and provide to all of components, they can reach context easily.
     - useEffect: Fetching data from localstorage in first render, and adding animation on cart button when amount of items changes.
     - useReducer: any update in cart will also update miltiple state (cartItems, orderAmount), to help us clean up the code, take advantage of useReducer.
     - useState: controll simple state change.

2. Storage data into localStorage
3. RWD design so you can use on any device.

---

### Update 2022-10-07

1. Adding extension page fot delivery info form.
2. move modal related state & handle to context.
3. Adding Card UI component and replace part of List UI component with it.
4. RWD optimazation.

---

### Update 2022-10-06 (connect to firebase)

1. instead of dealing with data through localstorage, we storage data on firebase and process them.
   replace all code relating to localstorage to fetch API.
2. Adding form of delivery info, which contains input value validation, error message. (with custom hooks help)
