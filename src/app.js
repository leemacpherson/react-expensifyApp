import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";

const store = configStore();

store.dispatch(
  addExpense({ description: "water bill", amount: 4500, createdAt: 1000 })
);
store.dispatch(
  addExpense({ description: "gas bill", amount: 1000, createdAt: 2000 })
);
store.dispatch(
  addExpense({ description: "Rent", amount: 109500, createdAt: 3000 })
);

// const expenseOne = store.dispatch(
//   addExpense({
//     description: "Rent",
//     amount: 100000,
//     createdAt: 1000,
//     note: "this is rent in Fairfax",
//   })
// );
// store.dispatch(
//   addExpense({
//     description: "Coffee",
//     amount: 300,
//     createdAt: -1000,
//     note: "this is at Peets",
//   })
// );
// store.dispatch(
//   addExpense({
//     description: "Cod Sticks",
//     amount: 1200,
//     createdAt: 900,
//     note: "the little square cod sticks",
//   })
// );
// store.dispatch(
//   addExpense({
//     description: "Cod Squares",
//     amount: 33000,
//     createdAt: -2000,
//     note: "i put cod in here for the sorting",
//   })
// );
// store.dispatch(
//   addExpense({
//     description: "Gasoline",
//     amount: 3500,
//     createdAt: 3000,
//     note: "for driving to work",
//   })
// );

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));