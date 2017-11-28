export default class HallwaySim {
    createHallway() {
        const hallway = [];
        for (let i = 1; i <= 100; i++) {
            hallway.push({open: true});
        }
        return hallway;
    }

    changeHallwayState(hallway, person) {
        return hallway.map((e, i) => {
            if (i % person === 0) {
                e.open ? e.open = false : e.open = true;
            }
            return e;
        });

    }

    runSimulation() {
        let hallway = this.createHallway();
        for (let i = 5; i <= 100; i *= 5) {
            hallway = this.changeHallwayState(hallway, i);
        }
        console.log(hallway);
    }
}

module.exports = HallwaySim;