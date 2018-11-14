import errorHandling from "./features/support/errorHandling.js";
import testControllerHolder from "./features/support/testControllerHolder.js";

fixture("fixture")
test
("test", testControllerHolder.capture)
.after(async t => {await errorHandling.ifErrorTakeScreenshot(t)})