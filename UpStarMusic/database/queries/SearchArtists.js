const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
    const findQuery = Artist.find(findCriteria(criteria))
        .sort({ [sortProperty]: 1 })
        .skip(offset).limit(limit)
    return Promise.all([findQuery,
        Artist.find(findCriteria(criteria)).sort({ [sortProperty]: 1 }).count()]).then((result) => {
            return {
                all: result[0],
                count: result[1],
                offset: offset,
                limit: limit
            }
        })
}

const findCriteria = (criteria) => {
    let result = {}
    if (Object.keys(criteria).length === 1 && criteria.name !== "") {
        result = { name: { $regex: criteria.name } }
    } else if (criteria.yearsActive && criteria.age) {
        result = {
            name: { $regex: criteria.name },
            age: { $gte: parseInt(criteria.age.min), $lte: parseInt(criteria.age.max) },
            yearsActive: { $gte: parseInt(criteria.yearsActive.min), $lte: parseInt(criteria.yearsActive.max) }
        }
    } else if (criteria.age) {
        result = {
            name: { $regex: criteria.name },
            age: { $gte: parseInt(criteria.age.min), $lte: parseInt(criteria.age.max) }
        }
    } else if (criteria.yearsActive) {
        result = {
            name: { $regex: criteria.name },
            yearsActive: { $gte: parseInt(criteria.yearsActive.min), $lte: parseInt(criteria.yearsActive.max) }
        }
    }
    return result
}
