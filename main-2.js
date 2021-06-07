// Next gen main
var initializer = require('init');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    if (typeof Memory.initialized === 'undefined' || Memory.initialized === false) {
        // TODO: Perhaps the initializer should check if it is initialized itself
        initializer.run(Memory, Game);
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var tower = Game.getObjectById('18138f5368dbf7c5590dcd37');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    // TODO: Here will start to decide what creep needs to be generated next
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (Memory.HarvestersCount != harvesters.length) {
        console.log('Harvesters: ' + harvesters.length);
        Memory.HarvestersCount = harvesters.length;
    }


    // TODO: This has to be improved a lot :)
    if(harvesters.length < 2) {
        // TODO: Do not try to spawn if the last one is not yet done (not yet really spawning)
        if (!Game.spawns['Spawn1'].spawning) {
            
            // Check if a new harvester can be spawned now
            var newName = 'Harvester' + Memory.lastHarvesterNr;
            var testIfCanSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 
                newName, { dryRun: true });
            
            switch (testIfCanSpawn) {
                case ERR_NOT_ENOUGH_ENERGY:
                    // TODO: Show the message only once
                    console.log('Not enough energy to spawn: ' + newName);
                    break;
                case OK:
                    console.log('Starting to spawn: ' + newName);
                    Memory.lastHarvesterNr = ++Memory.lastHarvesterNr
                    Game.spawns['Spawn1'].spawnCreep(
                        [WORK,CARRY,MOVE], 
                        newName, 
                        {memory: {role: 'harvester'}});
                    break;
            }
        }
    }

    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    // TODO: Outputs like this could be extracted to some kind of notifier class
    for(var name in Game.rooms) {
        if (Memory.lastAvailableEnergyValue != Game.rooms[name].energyAvailable) {
            console.log('Room "'+name+'" has ' + Game.rooms[name].energyAvailable + ' energy');
            Memory.lastAvailableEnergyValue = Game.rooms[name].energyAvailable;
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}

