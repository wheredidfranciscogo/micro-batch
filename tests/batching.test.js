const {
  Job,
  JobResult,
  RobotComponent,
  Robot,
  RobotBuilder,
} = require('../batching');

// Test suite for the Job class
describe('Job Class', () => {
  test('should create a Job instance with correct data', () => {
    const testData = 'data data';
    const job = new Job(testData);
    expect(job.data).toBe(testData);
  });
});

// Test suite for the JobResult class
describe('JobResult Class', () => {
  test('should create a JobResult instance with correct data and error', () => {
    const testData = 'data data';
    const testError = new Error('error error');
    const jobResult = new JobResult(testData, testError);
    expect(jobResult.data).toBe(testData);
    expect(jobResult.error).toBe(testError);
  });
});

// Test suite for the RobotComponent class
describe('RobotComponent Class', () => {
  test('should create a RobotComponent instance with correct name', () => {
    const testName = 'ROBO';
    const robotComponent = new RobotComponent(testName);
    expect(robotComponent.name).toBe(testName);
  });
});

// Test suite for the Robot class
describe('Robot Class', () => {
  test('should create a Robot instance with given components', () => {
    const testComponents = [
      new RobotComponent('component1'),
      new RobotComponent('component2'),
    ];
    const robot = new Robot(testComponents);
    expect(robot.components).toEqual(testComponents);
  });
});

// Test suite for the RobotBuilder class
describe('RobotBuilder Class', () => {
  test('constructor should set properties correctly', () => {
    const batchSize = 5;
    const buildTime = 4000;
    const handleBatchCompletion = jest.fn();
    const robotBuilder = new RobotBuilder(
      batchSize,
      buildTime,
      handleBatchCompletion
    );
    expect(robotBuilder.batchSize).toBe(batchSize);
    expect(robotBuilder.buildTime).toBe(buildTime);
    expect(robotBuilder.handleBatchCompletion).toBe(handleBatchCompletion);
    expect(robotBuilder.componentsQueue).toEqual([]);
    expect(robotBuilder.batch).toEqual([]);
    expect(robotBuilder.building).toBe(false);
    expect(robotBuilder.shutdownFlag).toBe(false);
  });

  test('addComponent should add components to componentsQueue', () => {
    const robotBuilder = new RobotBuilder();
    const testComponent = new RobotComponent('test component');
    robotBuilder.addComponent(testComponent);
    expect(robotBuilder.componentsQueue).toContain(testComponent);
  });
});
