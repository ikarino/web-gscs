import { Manager, SCSInput } from "../scs";

export function foo(a: number, b: number) {
  return `Worker result: ${a + b}`;
}

export function runScs(inp: SCSInput) {
  const m = new Manager(inp);
  m.runAllTrial();
  return m.summarizeOutputs();
}

export function runScs10(inp: SCSInput) {
  const m = new Manager(inp);
  for (let t = 0; t < inp.config.trial / 10; t++) {
    m.trial();
    m.trialOutputs.push(m.toJson());
  }
  return m.trialOutputs;
}
