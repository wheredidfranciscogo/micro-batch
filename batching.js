/**
I think we can create 5 classes to represent the 5 silo areas of this process.

Flow of this micro-batch could be:

(RobotBuilder (Job and JobResult) ) <- RobotComponet
|
|---> Robot (Output)

Class Job:
    - carry the data we are planning to use

Class JobResult:
    - carry the result data / error of the job
*/

class Job {
  constructor(data) {
    this.data;
  }
}

class JobResult {
  constructor(data, error) {
    this.data;
    this.error;
  }
}
