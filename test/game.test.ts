import { expect, test, beforeEach } from "vitest";
import { TestRunner } from "@boardzilla/core";
import setup, { Cabo } from "../src/game/index.js";

let runner: TestRunner<Cabo>;

beforeEach(() => {
  runner = new TestRunner(setup);
});
