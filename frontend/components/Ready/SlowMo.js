import * as Matter from 'matter-js';
import React, { Component } from "react";
import ReactDOM from "react-dom";
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
window.addEventListener('load', () => {
	//Fetch our canvas
	var canvas = document.createElement('canvas');

	//Setup Matter JS
	var engine = Matter.Engine.create();
	var world = engine.world;
	var render = Matter.Render.create({
		canvas: canvas,
		engine: engine,
		options: {
			width: 1800,
			height: 950,
			wireframes: false,
			showAngleIndicator: false
		}
	});

  Matter.Render.run(render);

  var runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  Matter.World.add(world, [
    Matter.Bodies.rectangle(900, 0, 1800, 50, { isStatic: true }),
    Matter.Bodies.rectangle(900, 950, 1800, 50, { isStatic: true }),
    Matter.Bodies.rectangle(1800, 600, 50, 1200, { isStatic: true }),
    Matter.Bodies.rectangle(0, 600, 50, 1200, { isStatic: true })
  ]);

  var explosion = function(engine) {
    var bodies = Matter.Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];

      if (!body.isStatic && body.position.y >= 500) {
        var forceMagnitude = 0.05 * body.mass;

        Matter.Body.applyForce(body, body.position, {
          x: (forceMagnitude + Matter.Common.random() * forceMagnitude) * Matter.Common.choose([1, -1]),
          y: -forceMagnitude + Matter.Common.random() * -forceMagnitude
        });
      }
    }
  };

  var timeScaleTarget = 1,
  counter = 0;

  Matter.Events.on(engine, 'afterUpdate', function(event) {
    // tween the timescale for bullet time slow-mo
    engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;

    counter += 1;
    // every 1.5 sec
    if (counter >= 60 * 1.5) {

      // flip the timescale
      if (timeScaleTarget < 1) {
        timeScaleTarget = 1;
      } else {
        timeScaleTarget = 0.05;
      }

      // create some random forces
      explosion(engine);

      // reset counter
      counter = 0;
    }
});

  var bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8
  };

  // add some small bouncy circles... remember Swordfish?
  Matter.World.add(world, Matter.Composites.stack(15, 100, 15, 10, 20, 40, function(x, y) {
    return Matter.Bodies.circle(x, y, Matter.Common.random(10, 20), bodyOptions);
  }));
  // add some larger random bouncy objects
  Matter.World.add(world, Matter.Composites.stack(50, 50, 12, 3, 0, 0, function(x, y) {
    switch (Math.round(Matter.Common.random(0, 1))) {

      case 0:
      if (Matter.Common.random() < 0.8) {
        return Matter.Bodies.rectangle(x, y, Matter.Common.random(20, 50), Matter.Common.random(20, 50), bodyOptions);
      } else {
        return Matter.Bodies.rectangle(x, y, Matter.Common.random(80, 120), Matter.Common.random(20, 30), bodyOptions);
      }
      case 1:
      return Matter.Bodies.polygon(x, y, Math.round(Matter.Common.random(4, 8)), Matter.Common.random(20, 50), bodyOptions);

    }
  }));

  // add mouse control
  var mouse = Matter.Mouse.create(render.canvas),
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

	Matter.World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

	//Start the engine
	Matter.Engine.run(engine);
	Matter.Render.run(render);

}, false);

class SlowMo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
          <div id="world" ref="world">Loading...
              <iframe width="1" height="1" src="https://www.youtube.com/embed/hZe5K1DN4ec?autoplay=1" />
          </div>
        );
    }
}

export default SlowMo;
