var initializer = {

    run: function(Memory, Game) {
        Memory.lastAvailableEnergyValue = 0;
        Memory.HarvestersCount = 0;
        Memory.lastHarvesterNr=1;

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

        Memory.initialized = true;
        console.log("Initialized!");
    }
 };
 
 module.exports = initializer;