import {numberOfDaysToTravelDate} from '../src/client/js/formHandler'

describe("Testing the methods in formHandler", ()  => {
  test("Testing the numberOfDaysToTravelDate function", () => {
    const todayDate = new Date();
    expect(numberOfDaysToTravelDate(todayDate)).toBe(0);
  })
});
