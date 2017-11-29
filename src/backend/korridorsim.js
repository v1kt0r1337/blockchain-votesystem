/**
 * Case:
 * Hallway with 100 open doors.
 * 5 persons move through the hallway.
 * Person 1: Changes the state of every 5 door
 * Person 2: Every 10 door
 * Person 3: Every 15 door
 * Person 4: Every 20 door
 * Person 5: Every 25 door
 */
function runSimulation() {
    let hallway = createHallway();
    for (let person = 5; person <= 100; person *= 5) {
        hallway = changeHallwayState(hallway, person);
    }
    console.log(hallway);
}

function createHallway() {
    const hallway = [];
    for (let i = 1; i <= 100; i++) {
        hallway.push({open: true});
    }
    return hallway;
}

function changeHallwayState(hallway, person) {
    return hallway.map((e, i) => {
        if (i % person === 0) {
            e.open ? e.open = false : e.open = true;
        }
        return e;
    });
}


