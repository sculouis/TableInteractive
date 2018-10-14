var Cal = require("./index");
var cal = new Cal();
test(" 1 加 2 等於 3", () => {
  expect(cal.sum()).toBe(3);
});

test("sub 2 - 1 to equal 1", () => {
  expect(cal.sub(2, 1)).toBe(1);
});
