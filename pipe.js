/**
 * Created by Reinis on 15.03.2015..
 */
module.exports = function(creep) {
    creep.moveTo(creep.memory.target.x, creep.memory.target.y);

    if (creep.memory.role == 'pipehead') {
        var target = creep.pos.findClosest(Game.SOURCES, {maxOps: 10, ignoreCreeps: true});
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
        var droppedEnergy = creep.pos.findClosest(Game.DROPPED_ENERGY);
        if (creep.pos.isNearTo(droppedEnergy)) {
            creep.pickup(droppedEnergy);
        }

        if (creep.ticksToLive == 60) {
            Memory.buildOrder.unshift('pipe');
        }
    }

    // Look for carriers in range
    var pipeLocation = creep.memory.pipeLocation;
    if (pipeLocation !== 0) {
        var nextCarrierName = Memory.pipeToSource[pipeLocation - 1].name;
        creep.transferEnergy(Game.creeps[nextCarrierName]);
    } else {
        creep.transferEnergy(Game.spawns.Spawn1);
    }

    /*
     if (creep.ticksToLive == 75) {
     Memory.sourceLocation.unshift(creep.memory.target);
     Memory.buildOrder.unshift("harvester");
     console.log("Rebuilding harvester " + creep.name);
     }
     */
};