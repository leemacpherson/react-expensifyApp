import { removeExpense, addExpense, editExpense } from "../../actions/expenses";

test("should set up removeExpense action ", () => {
  const result = removeExpense({ id: "erty765" });
  expect(result).toEqual({ id: "erty765", type: "REMOVE_EXPENSE" });
});

test("should set up editExpense action", () => {
  const result = editExpense("56789", {
    note: "this is my new note on 11-20-21",
    createdAt: 20444859,
  });
  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: "56789",
    updates: { note: "this is my new note on 11-20-21", createdAt: 20444859 },
  });
});

test("should set up addExpense action with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 20000,
    note: "test note",
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test("should set up addExpense action with default values", () => {
  const expenseData = {};
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String),
    },
  });
});
