import { createStore } from "redux";

// Action Generators

const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy,
  };
};
const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: "DECREMENT",
    decrementBy: decrementBy,
  };
};
const resetCount = () => {
  return {
    type: "RESET",
    count: 0,
  };
};
const setCount = ({ count } = {}) => {
  return {
    type: "SET",
    count: count,
  };
};
// Reducer
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      const incrementBy = action.incrementBy;
      return {
        count: state.count + incrementBy,
      };
    case "DECREMENT":
      const decrementBy = action.decrementBy;
      return {
        count: state.count - decrementBy,
      };
    case "RESET":
      return {
        count: 0,
      };
    case "SET":
      return {
        count: action.count,
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

// Redux store subscription (allows use of unsubscribe())

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// store update actions that utilize action generators

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount({ incrementBy: 3 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));

// unsubscribe();
