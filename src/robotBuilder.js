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
    this.data = data;
  }
}

class JobResult {
  constructor(data, error) {
    this.data = data;
    this.error = error;
  }
}

class Robot {
  constructor(components) {
    this.components = components;
    this.specialNumber = this.generateSpecialNumber();
  }
  generateSpecialNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let specialNumber = '';
    for (let i = 0; i < 2; i++) {
      specialNumber += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }
    for (let i = 0; i < 4; i++) {
      specialNumber += Math.floor(Math.random() * 10);
    }
    return specialNumber;
  }
}

class RobotComponent {
  constructor(name) {
    this.name = name;
  }
}

class RobotBuilder {
  // This class has to handle the batchSize, the building time and control when the batch (Robot) is complete
  constructor(batchSize, buildTime, handleBatchCompletion) {
    this.batchSize = batchSize;
    this.buildTime = buildTime;
    this.handleBatchCompletion = handleBatchCompletion;
    this.componentsQueue = [];
    this.batch = [];
    this.shutdownFlag = false;
    this.building = false;
  }
  // this is the central part of our process
  // add the components to an array to later control the batch size (robot components number)
  addComponent(component) {
    // this seems to be the best place to flag the status of the service
    // there are no more component to be added to the queue therefore we can kill the service, RobotBuilder is down.
    if (!this.shutdownFlag) {
      this.componentsQueue.push(component);
      if (!this.building && this.componentsQueue.length >= this.batchSize) {
        this.startBuilding();
      }
    } else {
      console.log('No more jobs. RobotBuilder is down');
    }
  }
  startBuilding() {
    this.building = true;
    // lets make sure the components in the query match to the batchSize we define
    this.batch = this.componentsQueue.splice(0, this.batchSize);
    setTimeout(() => {
      const robot = new Robot(this.batch);
      const results = this.batch.map(
        (component) => new JobResult(component.name + ' assembled', null)
      );
      this.handleBatchCompletion(robot, results);
      if (this.componentsQueue.length >= this.batchSize) {
        this.startBuilding();
      } else {
        this.building = false;
      }
    }, this.buildTime);
  }
  // there are no more components in the Queue, therefore we set building to false
  // and proceed to shutdown RobotBuilder
  shutdown() {
    this.shutdownFlag = true;
  }
}

module.exports = { Job, JobResult, RobotComponent, Robot, RobotBuilder };
