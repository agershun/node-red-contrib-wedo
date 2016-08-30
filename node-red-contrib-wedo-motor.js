
module.exports = function(RED) {
	var WeDo = require('wedo-support');
	var wd = new WeDo.WeDo();


	function WeDoMotorNode(config) {
		RED.nodes.createNode(this,config);
        var node = this;
        node.motor = config.motor;
        node.direction = config.direction;
        node.speed = config.speed;
        node.duration = config.duration;

		node.on("input", function(msg) {
			var motor = 'motor'+this.motor;
			try() {
				wd[motor] = (motor.direction == 'left' ? 1 : -1) * motor.speed;
				if(this.duration) {
					setTimeout(function(){
						wd[motor] = 0;
						node.send({});
					},this.duration);
				} else {
					// Do nothing
					node.send();
				}
			} catch(err) {
				wd[motor] = 0;				
				node.error(err,{});
			}
		});
			
	}
	RED.nodes.registerType("wedo-motor",WeDoMotorNode);
};
