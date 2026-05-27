// Använder biblotek för att räkna ut vecka och år korrekt.
const { getISOWeek, getISOWeekYear } = require("date-fns");

function getCurrentWeekAndYear() {
    const now = new Date();

    return {
        week: getISOWeek(now),
        year: getISOWeekYear(now)
    }
}

module.exports = { getCurrentWeekAndYear };