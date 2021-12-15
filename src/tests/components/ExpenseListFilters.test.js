import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../../tests/fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilter correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilter correctly with altFilters", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "test1";
  wrapper.find("input").at(0).simulate("change", { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  const selectValue = "date";
  wrapper.find("select").simulate("change", { target: { value: selectValue } });
  expect(sortByDate).toHaveBeenCalled();
  expect(sortByAmount).not.toHaveBeenCalled();
});

test("should sort by amount", () => {
  const selectValue = "amount";
  wrapper.find("select").simulate("change", { target: { value: selectValue } });
  expect(sortByDate).not.toHaveBeenCalled();
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  const date = moment(0).add(1, "day");
  wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate: date });
  // expect(setStartDate).toHaveBeenLastCalledWith(date);
  expect(setStartDate).toHaveBeenCalled();
});

test("should handle date focus changes", () => {
  const calendarFocused = "startDate";
  wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
