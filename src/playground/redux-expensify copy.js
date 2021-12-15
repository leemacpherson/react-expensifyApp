import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ACTION GENERATORS  - functions that return action objects
// ADD EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});
// REMOVE_EXPENSE action generator
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({ type: "SET_TEXT_FILTER", text: text });
// SORT_BY_DATE
const sortByDate = () => ({ type: "SORT_BY_DATE" });
// SORT_BY_AMOUNT
const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" });
// SET_START_DATE
const setStartDate = (tico = undefined) => ({
  type: "SET_START_DATE",
  startDate: tico,
});
// SET_END_DATE
const setEndDate = (mochie = undefined) => ({
  type: "SET_END_DATE",
  endDate: mochie,
});
// Expense Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filter Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store Creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// Send actual values in using the ADD_EXPENSE action

const expenseOne = store.dispatch(
  addExpense({
    description: "Rent",
    amount: 100000,
    createdAt: 1000,
    note: "this is rent in Fairfax",
  })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: "Coffee",
    amount: 300,
    createdAt: -1000,
    note: "this is at Peets",
  })
);
const expenseThree = store.dispatch(
  addExpense({
    description: "Cod Sticks",
    amount: 1200,
    createdAt: 900,
    note: "the little square cod sticks",
  })
);
const expenseFour = store.dispatch(
  addExpense({
    description: "CO2 cartridets",
    amount: 33000,
    createdAt: -2000,
    note: "this is rent in Fairfax",
  })
);
const expenseFive = store.dispatch(
  addExpense({
    description: "Gasoline",
    amount: 3500,
    createdAt: 3000,
    note: "for driving to work",
  })
);
const expenseSix = store.dispatch(
  addExpense({
    description: "shoes",
    amount: 20000,
    createdAt: 970,
    note: "the sandals",
  })
);
// Send an action for REMOVE_EXPENSE action
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // Send an action for EDIT_EXPENSE action
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// // Send an call for an action to filter the expenses by 'text'
store.dispatch(setTextFilter("bill"));
// store.dispatch(setTextFilter());

// // Send an call for an action to choose how to sort the filtered list
// store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// set start date and end date
// store.dispatch(setStartDate(-2000));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(2000));

// Demo state

const demoState = {
  expenses: [
    {
      id: "poijasdfhwer",
      description: "January Rent",
      note: "This was the final payment for that address",
      amount: 54500, // using cents to avoid math hassles
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
