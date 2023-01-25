//const request = require("supertest")
const { convert, createEclipseObjects, formatCoordinates } = require("../convert");
const { MAR203420A } = require("../data/MAR203420A");
const { MAY200331A } = require("../data/MAY200331A")

describe("convert: refactor co-ordinate data into JSON object", () => {
  test("returns an array", () => {
    expect(convert(MAR203420A)).toBeInstanceOf(Array);
  });
  test("returns an array of arrays", () => {
    const testedLine = convert(MAR203420A);
    expect(testedLine[0]).toBeInstanceOf(Array);
  });
  test("will split the array on a space", () => {
    const testLine = [
      ` 08:40   00 06.3S 026 58.4W  01 01.1S 025 27.7W  00 33.5S 026 11.4W  1.032  12  90  113  01m55.0s`,
    ];
    const testedLine = convert(testLine);
    expect(testedLine[0].length).toBeGreaterThan(1);
  });
  test("removes all empty strings from array", () => {
    const testLine = [
      ` 08:40   00 06.3S 026 58.4W  01 01.1S 025 27.7W  00 33.5S 026 11.4W  1.032  12  90  113  01m55.0s`,
    ];
    const testedLine = convert(testLine);
    expect(testedLine[0].includes("")).toBe(false);
  });
});

describe("createEclipseObjects", () => {
  test("return an array of objects when passed an array of arrays", () => {
    const testLine = [
      ` 08:40   00 06.3S 026 58.4W  01 01.1S 025 27.7W  00 33.5S 026 11.4W  1.032  12  90  113  01m55.0s`,
    ];
    const convertedLine = convert(testLine);
    const arrayOfObjects = createEclipseObjects(convertedLine);
    expect(arrayOfObjects[0]).toBeInstanceOf(Object);
  });
  test("returned object has a key of time with a value of a string", () => {
    const testLine = [
      ` 08:40   00 06.3S 026 58.4W  01 01.1S 025 27.7W  00 33.5S 026 11.4W  1.032  12  90  113  01m55.0s`,
    ];
    const convertedLine = convert(testLine);
    const arrayOfObjects = createEclipseObjects(convertedLine);
    expect(arrayOfObjects[0].time).toBe("08:40");
  });
  test("returned object has correct keys with the correct data", () => {
    const testLine = [
      ` 08:40   00 06.3S 026 58.4W  01 01.1S 025 27.7W  00 33.5S 026 11.4W  1.032  12  90  113  01m55.0s`,
    ];
    const convertedLine = convert(testLine);
    const arrayOfObjects = createEclipseObjects(convertedLine);
    expect(arrayOfObjects[0].northLat).toBe("06.3S");
    expect(arrayOfObjects[0].northLong).toBe("58.4W");
    expect(arrayOfObjects[0].southLat).toBe("01.1S");
    expect(arrayOfObjects[0].southLong).toBe("27.7W");
    expect(arrayOfObjects[0].centerLat).toBe("33.5S");
    expect(arrayOfObjects[0].centerLong).toBe("11.4W");
    expect(arrayOfObjects[0].pathWidth).toBe("113");
    expect(arrayOfObjects[0].centerDuration).toBe("01m55.0s");
  });
  test("returns an array of objects with the right keys", () => {
    const testArray = [
      ` 08:54   02 18.3N 010 23.5W  01 15.4N 009 29.6W  01 47.0N 009 56.2W  1.037  32  91  135  02m39.1s`,
      ` 08:56   02 38.8N 008 57.7W  01 35.2N 008 04.6W  02 07.1N 008 30.8W  1.038  34  91  137  02m43.8s`,
      ` 08:58   02 59.3N 007 37.6W  01 55.1N 006 45.2W  02 27.3N 007 11.1W  1.039  35  92  139  02m48.2s`,
      ` 09:00   03 19.8N 006 22.5W  02 15.0N 005 30.5W  02 47.5N 005 56.2W  1.039  37  92  141  02m52.4s`,
    ];
    const convertedArray = convert(testArray);
    const arrayOfObjects = createEclipseObjects(convertedArray);
    arrayOfObjects.forEach((obj) => {
      expect(obj).toEqual(
        expect.objectContaining({
          northLat: expect.any(String),
          northLong: expect.any(String),
          southLat: expect.any(String),
          southLong: expect.any(String),
          centerLat: expect.any(String),
          centerLong: expect.any(String),
          pathWidth: expect.any(String),
          centerDuration: expect.any(String),
        })
      );
    });
  });
  test("will exclude elements that do no fit the data format", () => {
    const convertedArray = convert(MAR203420A);
    const arrayOfObjects = createEclipseObjects(convertedArray);
    arrayOfObjects.forEach((obj) => {
      expect(obj).toEqual(
        expect.objectContaining({
          northLat: expect.any(String),
          northLong: expect.any(String),
          southLat: expect.any(String),
          southLong: expect.any(String),
          centerLat: expect.any(String),
          centerLong: expect.any(String),
          pathWidth: expect.any(String),
          centerDuration: expect.any(String),
        })
      );
    });
  });
  test("object will return date of eclipse", () => {
    const testArray = [
      ` Eclipse of   2034 Mar 20`,
      ``,
      `  `,
      `                                                                      M:S                 Central`,
      `Universal  Northern Limit      Southern Limit       Central Line     Diam.  Sun Sun Path   Line`,
      `         ------------------  ------------------  ------------------  Ratio  Alt Azm Width Durat.`,
      `  Time   Latitude Longitude  Latitude Longitude  Latitude Longitude`,
      `          °   ´     °   ´      °   ´     °   ´      °   ´     °   ´            °   °   km`,
      `  `,
      ` Limits  00 29.7S 037 36.1W  01 23.2S 037 29.1W  00 56.5S 037 37.4W  1.028   0   -   99  01m32.7s`,
      ` 08:38   00 28.0S 035 03.6W  01 19.2S 031 31.9W  00 53.2S 032 58.5W  1.029   5  90  104  01m40.9s`,
      ` 08:40   00 06.3S 026 58.4W  01 01.1S 025 27.7W  00 33.5S 026 11.4W  1.032  12  90  113  01m55.0s`,
    ];
    const convertedArray = convert(testArray);
    const arrayOfObjects = createEclipseObjects(convertedArray);
    expect(arrayOfObjects[0].date).toBe("2034Mar20");
  });
  test('handles object where there is a null value in the northern latitude', () => {
    const testArray = [` Eclipse of   2024 Apr 08`,
    ``,
    `  `,
    `                                                                      M:S                 Central`,
    `Universal  Northern Limit      Southern Limit       Central Line     Diam.  Sun Sun Path   Line`,
    `         ------------------  ------------------  ------------------  Ratio  Alt Azm Width Durat.`,
    `  Time   Latitude Longitude  Latitude Longitude  Latitude Longitude`,
    `          °   ´     °   ´      °   ´     °   ´      °   ´     °   ´            °   °   km`,
    `  `,
    ` Limits  07 11.6S 158 43.9W  08 27.2S 158 20.1W  07 49.5S 158 31.9W  1.040   0   -  144  02m06.3s`,
    ` 16:40      -         -      07 36.2S 152 54.5W  07 38.1S 157 11.2W  1.040   1  82  146  02m08.8s`,
    ``,
    ` 16:42   05 30.6S 149 47.6W  06 11.7S 146 38.0W  05 50.2S 148 07.8W  1.043  11  81  159  02m27.5s`,]
    const convertedArray = convert(testArray)
    const testedArray = createEclipseObjects(convertedArray)
    expect(testedArray[1].southLatDegrees).toBe("07")
    expect(testedArray[1].northLatDegrees).toBe(null)
  })
  test('handles object where there is a null value in the southern latitude', () => {
    const testArray = [` Eclipse of   2021 Dec 04`,
    ``,
    `  `,
    `                                                                      M:S                 Central`,
    `Universal  Northern Limit      Southern Limit       Central Line     Diam.  Sun Sun Path   Line`,
    `         ------------------  ------------------  ------------------  Ratio  Alt Azm Width Durat.`,
    `  Time   Latitude Longitude  Latitude Longitude  Latitude Longitude`,
    `          °   ´     °   ´      °   ´     °   ´      °   ´     °   ´            °   °   km`,
    `  `,
    ` Limits  51 51.9S 048 56.5W  54 21.8S 053 44.4W  53 04.1S 051 10.8W  1.031   0   -  413  01m27.8s`,
    ` 07:04   58 27.0S 038 51.2W     -         -      56 18.6S 045 43.9W  1.033   5 124  440  01m34.4s`,
    ` 07:06   60 15.7S 037 04.5W  55 28.4S 051 45.9W  58 47.7S 042 45.2W  1.034   8 121  450  01m38.8s`,]
    const convertedArray = convert(testArray)
    const testedArray = createEclipseObjects(convertedArray)
    expect(testedArray[1].southLatDegrees).toBe(null)
    expect(testedArray[1].centerLatDegrees).toBe('56')
  })
  test('does not include titles in the middle of data', () => {
    const testArray = [
        ` 16:29   13 21.7S 095 58.9W  15 01.2S 095 15.6W  14 11.2S 095 37.1W  0.947  50  45  197  05m53.0s`,
    ` 16:30   13 10.0S 095 39.3W  14 49.2S 094 55.8W  13 59.3S 095 17.4W  0.947  51  44  197  05m54.1s`,
    ``,
    `  `,
    `                                                                      M:S                 Central`,
    `Universal  Northern Limit      Southern Limit       Central Line     Diam.  Sun Sun Path   Line`,
    `         ------------------  ------------------  ------------------  Ratio  Alt Azm Width Durat.`,
    `  Time   Latitude Longitude  Latitude Longitude  Latitude Longitude`,
    `          °   ´     °   ´      °   ´     °   ´      °   ´     °   ´            °   °   km`,
    `  `,
    ` 16:31   12 58.4S 095 19.9W  14 37.4S 094 36.2W  13 47.6S 094 57.9W  0.948  51  44  197  05m55.2s`,
    ` 16:32   12 46.9S 095 00.8W  14 25.6S 094 17.0W  13 36.0S 094 38.7W  0.948  52  43  196  05m56.2s`,
]
    const convertedArray = convert(testArray)
    const testedArray = createEclipseObjects(convertedArray)
    expect(testedArray[0].northLatDegrees).toBe('13')
    expect(testedArray[2].northLatDegrees).toBe('12')
  })
  test("returns the correct data for null center line", () => {
    const convertRes = convert(MAY200331A)
    const eclipseObjects = createEclipseObjects(convertRes)
    expect(eclipseObjects[1].centerLat).toBe(null)
  })
});

describe("formatCoordinates", () => {
  test("return an array of objects when passed an array of arrays", () => {
    const convertedArray = convert(MAR203420A);
    const arrayOfObjects = createEclipseObjects(convertedArray);
    const testedArray = formatCoordinates(arrayOfObjects);
    const testObject = [{
        date: "20240408",
        time: "1642",
        northLat: "20.5S",
        northLatDegrees: "04",
        northLong: "29.6W",
        northLongDegrees: "145",
        southLat: "11.7S",
        southLatDegrees: "06",
        southLong: "38.0W",
        southLongDegrees: "146",
        centerLat: "50.2S",
        centerLatDegrees: "05",
        centerLong: "07.8W",
        centerLongDegrees: "148",
        pathWidth: "159",
        centerDuration: "02m27.5s"
      }]
      const testedObject = formatCoordinates(testObject)
    expect(testedObject[0].centerCoordinates.longitude).toBe(-148.1189);
  });
  test("return an array of objects when passed an array of arrays", () => {
    const convertedArray = convert(MAR203420A);
    const arrayOfObjects = createEclipseObjects(convertedArray);
    const testedArray = formatCoordinates(arrayOfObjects);
    const testObject = [{
        date: "20240408",
        time: "1642",
        northLat: "20.5S",
        northLatDegrees: "04",
        northLong: "29.6W",
        northLongDegrees: "145",
        southLat: "11.7S",
        southLatDegrees: "06",
        southLong: "38.0W",
        southLongDegrees: "146",
        centerLat: "50.2S",
        centerLatDegrees: "05",
        centerLong: "07.8W",
        centerLongDegrees: "148",
        pathWidth: "159",
        centerDuration: "02m27.5s"
      }]
      const testedObject = formatCoordinates(testObject)
    expect(testedObject[0].hasOwnProperty('centerLong')).toBe(false);
  });
});

