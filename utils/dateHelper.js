
function getCurrentWeekAndYear() {
    const now = new Date();

    let currentYear = now.getFullYear();

    return {
        week: 23,
        year: currentYear
    }
}

module.exports = { getCurrentWeekAndYear };