/* Your Code Here */
const exampleArray = ["Kim","Smith","clerk",8]
function createEmployeeRecord(array) {
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}
function createEmployeeRecords(arrayOfArray) {
    return arrayOfArray.map(createEmployeeRecord)
}

//employee record use as context
function createTimeInEvent(time){
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(time.slice(11), 10),
        date: time.slice(0,10),
    }
    this.timeInEvents.push(timeObj)
    return this
}

function createTimeOutEvent(time) {
    const timeObj = {
        type: "TimeOut",
        hour: parseInt(time.slice(11), 10),
        date: time.slice(0,10),
    }
    this.timeOutEvents.push(timeObj)
    return this
}

function hoursWorkedOnDate(soughtDate) {
    const compareTimeIn = this.timeInEvents.find(element => element.date === soughtDate);
    const compareTimeOut = this.timeOutEvents.find(element => element.date === soughtDate);
    return (compareTimeOut.hour - compareTimeIn.hour) / 100
}

function wagesEarnedOnDate(soughtDate) {
    return hoursWorkedOnDate.call(this, soughtDate) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, findFirstName) {
    return srcArray.find(e => e.firstName === findFirstName)
}

function calculatePayroll(srcArray) {
    const payable = srcArray.reduce(function(accumulator, object) {
        return accumulator + allWagesFor.call(object)
    }.bind(this),0)
    
    return payable
}
