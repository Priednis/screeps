/**
 * Created by Reinis on 15.03.2015..
 */
module.exports = function(creep) {
    var target;

    if (creep.memory.role == "squadhealer") {
        target = creep.pos.findInRange(Game.MY_CREEPS, 3, {
            filter: function(object) {
                return (object.hits < object.hitsMax) && ((object.memory.role == 'squadguard') || (object.memory.role == 'squadhealer'));
            }
        });

        if(target.length) {
            creep.moveTo(target[0]);
            creep.heal(target[0]);
        } else {
            creep.moveTo(creep.memory.target.x, creep.memory.target.y);
        }

        if (creep.ticksToLive == 200) {
            Memory.buildOrder.push('squadhealer');
        }

    } else {
        target = creep.pos.findInRange(Game.CREEPS, 3, {
            filter: function(object) {
                return (object.owner.username !== 'Priednis');
            }
        });

        if(target.length) {
            creep.rangedAttack(target[0]);
        } else {
            creep.moveTo(creep.memory.target.x, creep.memory.target.y);
        }

        if (creep.ticksToLive == 200) {
            Memory.buildOrder.push('squadguard');
        }
    }
};