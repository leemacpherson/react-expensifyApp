import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set up default expenses array", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("remove an expense from the test array with an id that matches", () => {
  const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("remove an expense from the test array with an id that does not match", () => {
  const action = { type: "REMOVE_EXPENSE", id: "" };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test("should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "4",
      description: "test",
      note: test,
      amount: 0,
      createdAt: moment(0).add(5, "days"),
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("should edit an expense", () => {
  const description = "test description";
  const update = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: {
      description,
    },
  };
  const result = expensesReducer(expenses, update);
  expect(result[1].description).toEqual(description);
});

test("should NOT edit an expense if expense not found", () => {
  const update = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      description: "test description",
    },
  };
  const result = expensesReducer(expenses, update);
  expect(result).toEqual(expenses);
});
