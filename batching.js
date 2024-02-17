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

    Define the classes for the Robot, RobotComponent and RobotBuilder

Class Robot:
    - components
    - number / serial number

Class RobotComponent
    - name

Class RobotBuilder
    - batch size
    - build time frequency
    - handle batch completion

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

class Robot {
  constructor(components) {
    this.components;
  }
}

class RobotComponent {
  constructor(name) {
    this.name;
  }
}

class RobotBuilder {
  // This class has to handle the batchSize, the building time and control when the batch (Robot) is complete
  constructor(batchSize, buildTime, handleBatchCompletion) {
    this.batchSize;
    this.buildTime;
    this.handleBatchCompletion;
  }
}


