let flatmates = [];
let chores = [];
let assignments = [];
let week = 1;


// -------------------------
// ADD FLATMATE
// -------------------------

function addFlatmate() {

    const input = document.getElementById("flatmateInput");

    const name = input.value.trim();

    if (name === "") {
        alert("Enter a flatmate name");
        return;
    }

    flatmates.push({
        name: name,
        completed: 0,
        workload: 0,
        lastChore: ""
    });

    input.value = "";

    displayFlatmates();
    updateDashboard();
}


// -------------------------
// DISPLAY FLATMATES
// -------------------------

function displayFlatmates() {

    const list = document.getElementById("flatmateList");

    list.innerHTML = "";

    flatmates.forEach((person, index) => {

        list.innerHTML += `
            <li>
                ${person.name}
                <button onclick="removeFlatmate(${index})">
                    Remove
                </button>
            </li>
        `;
    });
}


// -------------------------
// REMOVE FLATMATE
// -------------------------

function removeFlatmate(index) {

    flatmates.splice(index, 1);

    displayFlatmates();

    updateDashboard();
}


// -------------------------
// ADD CHORE
// -------------------------

function addChore() {

    const nameInput = document.getElementById("choreInput");

    const difficulty =
        Number(document.getElementById("difficultyInput").value);

    const name = nameInput.value.trim();

    if (name === "") {
        alert("Enter a chore");
        return;
    }

    chores.push({
        name: name,
        difficulty: difficulty
    });

    nameInput.value = "";

    displayChores();

    updateDashboard();
}


// -------------------------
// DISPLAY CHORES
// -------------------------

function displayChores() {

    const list = document.getElementById("choreList");

    list.innerHTML = "";

    chores.forEach((chore, index) => {

        list.innerHTML += `
            <li>
                ${chore.name}
                — Difficulty ${chore.difficulty}

                <button onclick="removeChore(${index})">
                    Remove
                </button>
            </li>
        `;
    });
}


// -------------------------
// REMOVE CHORE
// -------------------------

function removeChore(index) {

    chores.splice(index, 1);

    displayChores();

    updateDashboard();
}


// -------------------------
// GENERATE ASSIGNMENTS
// -------------------------

function generateAssignments() {

    if (flatmates.length === 0) {
        alert("Add flatmates first");
        return;
    }

    if (chores.length === 0) {
        alert("Add chores first");
        return;
    }

    assignments = [];

    // Sort flatmates by current workload
    let availablePeople = [...flatmates];

    availablePeople.sort(
        (a, b) => a.workload - b.workload
    );


    chores.forEach((chore, index) => {

        // Find person who:
        // 1. Has low workload
        // 2. Didn't get this chore last week

        let person = availablePeople.find(
            p => p.lastChore !== chore.name
        );

        // If everyone had this chore before,
        // choose lowest workload person

        if (!person) {
            person = availablePeople[0];
        }

        assignments.push({
            person: person,
            chore: chore,
            done: false
        });

        person.workload += chore.difficulty;

        person.lastChore = chore.name;

        // Re-sort after assignment
        availablePeople.sort(
            (a, b) => a.workload - b.workload
        );
    });


    displayAssignments();

    updateStatistics();
}


// -------------------------
// DISPLAY ASSIGNMENTS
// -------------------------

function displayAssignments() {

    const container =
        document.getElementById("assignments");

    container.innerHTML = "";

    assignments.forEach((assignment, index) => {

        container.innerHTML += `

            <div class="assignment"
                 id="assignment-${index}">

                <div>

                    <strong>
                        ${assignment.person.name}
                    </strong>

                    → ${assignment.chore.name}

                    <br>

                    Difficulty:
                    ${assignment.chore.difficulty}

                </div>

                <button onclick="markDone(${index})">
                    ✓ Done
                </button>

            </div>

        `;
    });
}


// -------------------------
// MARK DONE
// -------------------------

function markDone(index) {

    const assignment = assignments[index];

    if (assignment.done) {
        return;
    }

    assignment.done = true;

    assignment.person.completed++;

    document
        .getElementById(`assignment-${index}`)
        .classList.add("done");

    updateDashboard();

    updateStatistics();
}


// -------------------------
// NEXT WEEK
// -------------------------

function nextWeek() {

    if (assignments.length === 0) {

        alert(
            "Generate this week's assignments first."
        );

        return;
    }

    week++;

    assignments = [];

    document.getElementById("weekNumber").textContent = week;

    generateAssignments();
}


// -------------------------
// DASHBOARD
// -------------------------

function updateDashboard() {

    document.getElementById("flatmateCount")
        .textContent = flatmates.length;

    document.getElementById("choreCount")
        .textContent = chores.length;

    let completed = 0;

    assignments.forEach(a => {

        if (a.done) {
            completed++;
        }

    });

    document.getElementById("completedCount")
        .textContent = completed;
}


// -------------------------
// STATISTICS
// -------------------------

function updateStatistics() {

    const statistics =
        document.getElementById("statistics");

    statistics.innerHTML = "";

    flatmates.forEach(person => {

        statistics.innerHTML += `

            <p>
                <strong>${person.name}</strong>

                — Completed:
                ${person.completed}

                | Workload:
                ${person.workload}
            </p>

        `;
    });
}