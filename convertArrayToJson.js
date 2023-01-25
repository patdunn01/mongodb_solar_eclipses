const fs = require('fs/promises')
const { convertCoordinates } = require('./formatCoordinates.js')
const { convert, createEclipseObjects, formatCoordinates, convertFromFile } = require('./convert.js')
const { giantArray } = require('./test-data/test-array')
const { totalArrays } = require('./total-arrays-all/total-arrays-all')
const { hybridArrays } = require('./hybrid-arrays-all/hybrid-arrays-all')
const { annularArrays } = require('./annular-arrays-all/annular-arrays')

const convertFromStrings = (array) => {
    const convertedFile = convert(array)
    const eclipseArray = createEclipseObjects(convertedFile)
    const formattedArray = formatCoordinates(eclipseArray)
    return formattedArray
}

const convertArrayOfStringsToJson = (arrayOfEclipses, type) => {

    const eclipseObjectsArray = arrayOfEclipses.map((eclipse) => {
        const array = convertFromStrings(eclipse)
        const individualEclipse = { type: type, [array[0].date]: array }
        return individualEclipse
    })

    const eclipsesObject = { eclipseObjectsArray }
    
    return eclipsesObject
}

module.exports = { convertArrayOfStringsToJson }

