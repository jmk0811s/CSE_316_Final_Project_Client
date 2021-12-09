import { render, screen } from '@testing-library/react';
import {sortByDate, dateToString} from "./utils/HelperFunctions";

import App from './App';
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

/*
 * Unit Tests
 */

test("date to string test", () => {
  let date = new Date("2021-12-09");
  expect(dateToString(date)).toBe("2021 / 12 / 9");
});

test("sort by date test", () => {
  let obj1 = {
      mdate: new Date("2021-12-08").toLocaleString(),
  }
  let obj2 = {
      mdate: new Date("2021-12-07").toLocaleString(),
  }
  let obj3 = {
      mdate: new Date("2021-12-09").toLocaleString(),
  }

  let list1 = [obj1, obj2, obj3];
  let list2 = [obj3, obj1, obj2];
  console.log(list1);
  console.log(list2);
  console.log(sortByDate(list1));

  expect(sortByDate(list1).toString()).toBe(list2.toString());
});