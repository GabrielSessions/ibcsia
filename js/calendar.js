//The calendar is unfinished for this IA, but can be done later as an improvement.


class Calendar {
    constructor() {
        this.dueDates = [];
        this.currentMonth = (Date.now()).getMonth();
    }

    constructor(dueDates) {
        this.dueDates = dueDates
    }

    changeMonth(increment) {
        this.currentMonth += increment;
    }

    displayDeadline() {
        //To be done later
    }

    displayChecklist() {
        //To be done later
    }
}