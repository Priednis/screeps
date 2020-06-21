// var initialize = require('init');
var initializer = require('init');

var usePipe = require('pipe');
var guardWith = require('guard');
var healWith = require('healer');
var squadWith = require('squad');
var buildWith = require('builder');

// var roleBuilder = require('role.builder');

// for(var name in Game.creeps) {
//     var creep = Game.creeps[name];
//     if(creep.memory.role == 'harvester') {
//         roleHarvester.run(creep);
//     }
//     if(creep.memory.role == 'upgrader') {
//         roleUpgrader.run(creep);
//     }
//     if(creep.memory.role == 'builder') {
//         roleBuilder.run(creep);
//     }
// }

var mySpawn = Game.spawns.Spawn1;
//var myRoom = Game.spawns.Spawn1.room;

var pipes = 0;
var guards = 0;
var healers = 0;
var builders = 0;

//console.log('Name of Spawn: ' + mySpawn.name);
if(mySpawn.spawning) { 
    var spawningCreep = Game.creeps[mySpawn.spawning.name];
    mySpawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        mySpawn.pos.x + 1, 
        mySpawn.pos.y, 
        {align: 'left', opacity: 0.8});
}

if (typeof Memory.initialized === 'undefined' || Memory.initialized === false) {
    initializer.run(Memory, Game);
}

for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];

    switch (creep.memory.role) {
        case "pipehead":
        case "pipe":
            pipes++;
            usePipe(creep);
            break;
        case "guard":
            guards++;
            guardWith(creep);
            break;
        case "healer":
            healers++;
            healWith(creep);
            break;
        case "squadguard":
        case "squadhealer":
            squadWith(creep);
            break;
        case "builder":
        case "fixer":
            builders++;
            buildWith(creep, mySpawn);
            break;
    }
}

var nextBuild = Memory.buildOrder[0];
var nextBuildingPlan = Memory.buildingPlan[nextBuild];
var nextBuildingEnergy = nextBuildingPlan[0];

if (!mySpawn.spawning && mySpawn.energy >= nextBuildingEnergy) {
    var build = Memory.buildOrder.shift();

    // TODO: Perhaps this could be extracted to a separate module
    switch (build) {
        case 'pipehead':
            console.log('nextBuild: ' + nextBuild);
            console.log('Will try to SpawnCreep with plan: ' + nextBuildingPlan.slice(1, nextBuildingPlan.length));
            var creepName = mySpawn.spawnCreep(
                nextBuildingPlan.slice(1, nextBuildingPlan.length),
                'pipehead' + pipes,
                {
                    memory: {
                        role: 'pipehead',
                        pipeLocation: Memory.pipeCounter,
                        target: {
                            x: Memory.pipeToSource[Memory.pipeCounter].x, 
                            y: Memory.pipeToSource[Memory.pipeCounter].y}
                        }
                });
            Memory.pipeToSource[Memory.pipeCounter].name = creepName;
            Memory.pipeCounter--;
            break;
        case 'pipe':
            var creepName = mySpawn.spawnCreep(
                nextBuildingPlan.slice(1, nextBuildingPlan.length),
                'pipe' + pipes,
                {
                    role: 'pipe',
                    pipeLocation: Memory.pipeCounter,
                    target: {x: Memory.pipeToSource[Memory.pipeCounter].x, y: Memory.pipeToSource[Memory.pipeCounter].y}
                });
            Memory.pipeToSource[Memory.pipeCounter].name = creepName;
            Memory.pipeCounter--;
            break;
        case 'guard':
            var creepName = mySpawn.spawnCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'guard'});
            break;
        case 'healer':
            var creepName = mySpawn.spawnCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'healer'});
            break;
        case 'squadhealer':
            var creepName = mySpawn.spawnCreep(
                nextBuildingPlan.slice(1, nextBuildingPlan.length),
                null,
                {role: 'squadhealer', target: {x: 46, y: 25}});
            break;
        case 'squadguard':
            var creepName = mySpawn.spawnCreep(
                nextBuildingPlan.slice(1, nextBuildingPlan.length),
                null,
                {role: 'squadguard', target: {x:45, y:26}});
            break;
        case 'builder':
            var creepName = mySpawn.spawnCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'builder'});
            Memory.lastBuilder = creepName;
            break;
        case 'fixer':
            var creepName = mySpawn.spawnCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'fixer'});
            Memory.lastBuilder = creepName;
            break;
        default:
    }
    console.log('Build ' + build + ' with name ' + creepName);
}

if ((guards < 3) && (Memory.buildOrder.indexOf("guard") < 0) && !mySpawn.spawning) {
    Memory.buildOrder.unshift('guard');
}

if ((healers < 2) && (Memory.buildOrder.indexOf("healer") < 0) && !mySpawn.spawning) {
    Memory.buildOrder.unshift('healer');
}

/*


// From tutorial
mySpawn.spawnCreep(
	[Game.WORK, Game.CARRY, Game.MOVE],
	'Worker1'
);
mySpawn.spawnCreep(
	[Game.WORK, Game.CARRY, Game.MOVE],
	'Worker2'
);
mySpawn.spawnCreep(
	[Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
	'Builder1'
);
mySpawn.spawnCreep(
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

 */
