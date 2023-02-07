import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
import StartedInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
  public override displayJasmineStarted(info: StartedInfo, log: string): string {
    return `Total specs defined: ${info.totalSpecsDefined}\nLog: ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  })
);
