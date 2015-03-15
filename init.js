/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('init'); // -> 'a thing'
 *
 * Parts Borrowed from github.com/JacSjoerd
 */
 module.exports = function(){

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
         guard:         [340, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE],
         squadguard:    [750, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK],
         sniper:        [750, Game.MOVE, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK],
         healer:        [500, Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE],
         squadhealer:   [850, Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE],
         snipersupport: [850, Game.MOVE, Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL],
         harvester:     [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
         pipehead:      [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
         builder:       [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
         fixer:         [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
         carrier:       [200, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE],
         pipe:          [100, Game.CARRY, Game.MOVE],
         supplier:      [200, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE],
         snooper:       [200, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE]
     };

     // Setup array of initial build sequence.
     Memory.buildOrder = [
         'pipehead', 'pipehead', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe',
         'guard', 'guard', 'healer', 'guard', 'healer',
         'squadhealer', 'squadhealer', 'squadguard',
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
         {name: '', x: 43, y: 8},
         {name: '', x: 44, y: 7},
         {name: '', x: 45, y: 6},
         {name: '', x: 45, y: 5},
         {name: '', x: 45, y: 4},
         {name: '', x: 45, y: 3},
         {name: '', x: 46, y: 3}
     ];
     Memory.pipeCounter = Memory.pipeToSource.length - 1;

     Memory.sourceLocation = [{x: 43, y: 28}, {x: 44, y: 29}];
     Memory.source1 = {location: {x: 46, y: 2}, harvesters: []};
     Memory.source2 = {location: {x: 43, y: 29}, harvesters: []};

     Memory.initialized = true;
     console.log("Initialized!");
 };
 