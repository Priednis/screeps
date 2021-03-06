/**
 * Created by Reinis on 15.03.2015..
 */
module.exports = function(creep) {
    if (!creep.memory.deliveringEnergy && !creep.memory.pickingUpEnergy) {
        creep.moveTo(creep.memory.target.x, creep.memory.target.y);
    }

    if (creep.memory.role == 'pipehead') {
        var sources = creep.room.find(FIND_SOURCES);
        //var target = creep.pos.findClosest(Game.SOURCES, {maxOps: 10, ignoreCreeps: true});
        var target = sources[0];
        if (target) {
            creep.harvest(target);
        }

        if (creep.ticksToLive == 75) {
            Memory.buildOrder.unshift('pipehead');
            if (Memory.pipeCounter === 0) {
                Memory.pipeCounter = Memory.pipeToSource.length - 1;
            }
        }
    } else {
        // check for dropped energy nearby
        //var droppedEnergy = creep.pos.findClosest(Game.DROPPED_ENERGY);
        var droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
        var droppedEnergy = droppedSources[0];
        if (creep.pos.isNearTo(droppedEnergy) && creep.energy < creep.energyCapacity) {
            creep.memory.pickingUpEnergy = true;
            creep.moveTo(droppedEnergy);
            creep.pickup(droppedEnergy);
            if (creep.energy == creep.energyCapacity) {
                creep.memory.pickingUpEnergy = false;
            }
        } else {
            creep.memory.pickingUpEnergy = false;
        }

        if (creep.ticksToLive == 60) {
            Memory.buildOrder.unshift('pipe');
        }
    }

    // Look for carriers in range
    var pipeLocation = creep.memory.pipeLocation;
    if (pipeLocation !== 0) {
        var nextCarrierName = Memory.pipeToSource[pipeLocation - 1].name;
        creep.transfer(Game.creeps[nextCarrierName], RESOURCE_ENERGY);
    } else {
        // TODO: If no carriers exist, bring the energy back to Spawn
        if (creep.energy < creep.energyCapacity) {
            creep.memory.deliveringEnergy = false;
        } else {
            creep.memory.deliveringEnergy = true;
            creep.moveTo(Game.spawns.Spawn1);
            creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
        }
    }

    // If under attack and am carrying some energy, return to Spawn (and hope for the best :) )
    if (creep.hits < creep.hitsMax && creep.energy > 0) {
        creep.memory.deliveringEnergy = true;
        creep.moveTo(Game.spawns.Spawn1);
        creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
    } else {
        creep.memory.deliveringEnergy = false;
    }

    /*
     if (creep.ticksToLive == 75) {
     Memory.sourceLocation.unshift(creep.memory.target);
     Memory.buildOrder.unshift("harvester");
     console.log("Rebuilding harvester " + creep.name);
     }
     */
};