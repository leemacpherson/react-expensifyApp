import moment from "moment";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from "../../actions/filters";

test('should return an object containing type: "SET_START_DATE" and startDate: moment(0)', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});
test('should return an object containing type: "SET_END_DATE" and endDate: moment(0)', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});
test("should return an object with the type property set to SORT_BY_DATE", () => {
  const action = sortByDate();
  expect(action).toEqual({ type: "SORT_BY_DATE" });
});
test("should return an object with the type property set to SORT_BY_AMOUNT", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});
test('should return an object with type: "SET_TEXT_FILTER" and a text: "jest_test_w_text"', () => {
  const text = "jest_test_w_text";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text,
  });
});
test('should return an object with type: "SET_TEXT_FILTER" using defaults', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});
