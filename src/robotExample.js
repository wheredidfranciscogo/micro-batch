const {
  Job,
  JobResult,
  RobotComponent,
  Robot,
  RobotBuilder,
} = require('./robotBuilder');

// let's test the functionallity above and define the components needed to assamble a robot

const components = [
  new RobotComponent('chassis'),
  new RobotComponent('motor'),
  new RobotComponent('sensor'),
  new RobotComponent('arm'),
  new RobotComponent('processor'),
  new RobotComponent('lights'),
  new RobotComponent('bulbs'),
];

// lets handle the batch completion as requested
// it should provide a way to configure the batching behaviour i.e. size and frequency

// let twitch this for a better output
const onBatchComplete = (robot, results) => {
  console.log('Robot assembled:', robot);
  console.log('Results:', results);
};

// cast robotBuilder with batch size (5) and build time (4sec) (frequency)
const builder = new RobotBuilder(5, 4000, onBatchComplete);

// Add components to the builder for multiple jobs
// Do you want multiple batches, uncomment the loop
// for (let i = 0; i < 5; i++) {
components.forEach((component) => {
  builder.addComponent(component);
});
// }

// submitting a single job
setTimeout(() => {
  builder.addComponent(new RobotComponent('newComponent'));
}, 1000);

// Shutdown the builder after a delay
setTimeout(() => {
  builder.shutdown();
}, 5000);
