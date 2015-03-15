/**
 * Created by Reinis on 15.03.2015..
 */
module.exports = function(creep) {
    var base;

    if (typeof Game.flags.Flag1 === undefined) {
        base = Game.spawns.Spawn1;
    } else {
        base = Game.flags.Flag1;
    }

    var targets = base.pos.findInRange(Game.HOSTILE_CREEPS, 7, {
        filter: function(object) {
            return (object.owner.username != 'Source Keeper');
        }
    });

    if(targets.length > 0 && creep.getActiveBodyparts(Game.ATTACK)) {
        var target = creep.pos.findClosest(targets, {maxOps: 50});
        if(target) {
            creep.moveTo(target);
            creep.attack(target);
        }
    } else {
        creep.moveTo(Game.flags.Flag1);
    }
};