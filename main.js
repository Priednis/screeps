//var initialize = require('init');

var mySpawn = Game.spawns.Spawn1;
var myRoom = Game.spawns.Spawn1.room;

mySpawn.createCreep(
	[Game.WORK, Game.CARRY, Game.MOVE],
	'Worker1'
);
mySpawn.createCreep(
	[Game.WORK, Game.CARRY, Game.MOVE],
	'Worker2'
);
mySpawn.createCreep(
	[Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
	'Builder1'
);
mySpawn.createCreep(
	[Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE],
	'Guard1'
);
Memory.creeps.Worker1.role = 'harvester';
Memory.creeps.Worker2.role = 'harvester';
Memory.creeps.Builder1.role = 'builder';
Memory.creeps.Guard1.role = 'guard';

var harvester = require('harvester');

for(var i in Game.creeps) {
    var cree = Game.creeps[i];
    if(cree.memory.role == 'harvester') {
        harvester(cree);
    }
    
    if(cree.memory.role == 'builder') {
		if(cree.energy == 0) {
			cree.moveTo(mySpawn);
			mySpawn.transferEnergy(cree);
		}
		else {
			var targets = cree.room.find(Game.CONSTRUCTION_SITES);
			if(targets.length) {
				cree.moveTo(targets[0]);
				cree.build(targets[0]);
			}
		}
	}

    if(cree.memory.role == 'guard') {
	    var targets = cree.room.find(Game.HOSTILE_CREEPS);
	    if(targets.length) {
		    cree.moveTo(targets[0]);
		    cree.attack(targets[0]);
	    } else {
	        cree.moveTo(mySpawn)
	    }
    }
    
}
