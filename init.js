/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('init'); // -> 'a thing'
 *
 * Parts Borrowed from github.com/JacSjoerd
 */

 var initializer = {

    run: function(Memory, Game) {
     Memory.constructingPipe = true;
     Memory.lastBuilder = undefined;
     Memory.lastSniper = undefined;
     Memory.sniperCount = 0;
     Memory.sniperSupportCount = 0;
     Memory.lastHarvester = undefined;
     Memory.harvesterCount = 0;
     Memory.harvesters = {};
     Memory.replacingHarvester = "";
     Memory.activeCreeps = undefined;
     Memory.countedExtension = 0;

     // Building cost
     Memory.buildcost = {
         move: 50,
         work: 20,
         carry: 50,
         attack: 80,
         ranged_attack: 150,
         heal: 200,
         tough: 20
     };

     // Building plans
     Memory.buildingPlan = {
         guard:         [340, ATTACK, ATTACK, ATTACK, MOVE, MOVE],
         squadguard:    [750, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
         sniper:        [750, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
         healer:        [500, HEAL, HEAL, MOVE, MOVE],
         squadhealer:   [850, HEAL, HEAL, HEAL, HEAL, MOVE],
         snipersupport: [850, MOVE, HEAL, HEAL, HEAL, HEAL],
         harvester:     [160, WORK, WORK, WORK, CARRY, MOVE],
         pipehead:      [300, WORK, WORK, CARRY, MOVE],
         builder:       [190, WORK, WORK, MOVE, CARRY, MOVE],
         fixer:         [160, WORK, WORK, WORK, CARRY, MOVE],
         carrier:       [200, CARRY, CARRY, MOVE, MOVE],
         pipe:          [100, CARRY, MOVE],
         supplier:      [200, CARRY, CARRY, MOVE, MOVE],
         snooper:       [200, CARRY, CARRY, MOVE, MOVE]
     };

     // Setup array of initial build sequence.
     Memory.buildOrder = [
         'pipehead', 'pipehead', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe',
         'guard', 'guard', 'healer', 'guard', 'healer',
         'builder', 'squadhealer', 'squadhealer', 'squadguard',
         'snooper',
         'sniper', 'snipersupport', 'sniper',
         'harvester', 'harvester',
         'snooper'
     ];

     // Per 2015.03 Map
     Game.spawns.Spawn1.room.createFlag(36, 15, 'Flag1', Game.COLOR_YELLOW);
     Game.spawns.Spawn1.room.createConstructionSite(33, 16, Game.STRUCTURE_EXTENSION);

     // Get path to closest source to create a pipline
     Memory.pipeToSource = [
         {name: '', x: 24, y: 24},
         {name: '', x: 26, y: 24},
         {name: '', x: 28, y: 23},
         {name: '', x: 30, y: 22},
         {name: '', x: 32, y: 22},
         {name: '', x: 34, y: 20},
         {name: '', x: 35, y: 21}
     ];
    Memory.pipeCounter = Memory.pipeToSource.length - 1;

     Memory.sourceLocation = [{x: 19, y: 26}, {x: 20, y: 27}];
     Memory.source1 = {location: {x: 35, y: 20}, harvesters: []};
     Memory.source2 = {location: {x: 43, y: 44}, harvesters: []};

     Memory.initialized = true;

     console.log("Initialized!");
    }
 };
 
 module.exports = initializer;