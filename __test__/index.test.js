import {getLongAndLatFromGeoNamesApi} from '../src/server/index'

describe("Testing the methods of index.js file of server", () => {
  test("Testing the getLongAndLatFromGeoNamesApi function", async () => {
    const longitude = "2.3488";
    const latitude = "48.85341";
    const data = await getLongAndLatFromGeoNamesApi('paris');
    expect(data.longitude).toEqual(longitude);
    expect(data.latitude).toEqual(latitude);
  })
});
