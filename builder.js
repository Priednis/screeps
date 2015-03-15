/**
 * Created by Reinis on 15.03.2015..
 */
module.exports = function (creep) {
    var role = creep.memory.role;
    var target;

    if (role == 'builder'){
        target = creep.pos.findClosest(Game.CONSTRUCTION_SITES);
        if(target) {
            creep.build(target);
            if (!creep.pos.isNearTo(target)) {
                creep.moveTo(target);
            }
        }
    } else {
        target = creep.pos.findClosest(Game.STRUCTURES, {
            filter: function(object) {
                return (object.hitsMax - object.hits) > 200;
            }
        });
        if(target) {
            creep.repair(target);
            if (!creep.pos.isNearTo(target)) {
                creep.moveTo(target);
            }
        } else {
            target = creep.pos.findClosest(Game.CONSTRUCTION_SITES);
            if(target) {
                creep.build(target);
                if (!creep.pos.isNearTo(target)) {
                    creep.moveTo(target);
                }
            }
        }
    }

};