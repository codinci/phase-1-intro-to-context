// Your code here

function createEmployeeRecord(employeeArr) {
  //takes in an array as its paramater
  //returns an object
  return {
    firstName : employeeArr[0],
    familyName : employeeArr[1],
    title : employeeArr[2],
    payPerHour : employeeArr[3],
    timeInEvents : [],
    timeOutEvents : []
  }
}

function createEmployeeRecords(employeesArr) {
  return employeesArr.map((employeeArr) => createEmployeeRecord(employeeArr));
}

function createTimeInEvent(employeeRecord, timeStamp) {
    let[date, time] = timeStamp.split(' ');
    let timeIn = {};
    timeIn.type = "TimeIn";
    timeIn.hour = parseInt(time);
    timeIn.date = date;
    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
  let [date, time] = timeStamp.split(' ');
  let timeOut = {};
  timeOut.type = "TimeOut";
  timeOut.hour = parseInt(time);
  timeOut.date = date;
  employeeRecord.timeOutEvents.push(timeOut);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  for(let i = 0; i < employeeRecord.timeInEvents.length; i ++) {
   if(employeeRecord.timeInEvents[i].date == dateStamp) {
     return (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour) / 100;
   }
  }
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let dates = [];
  employeeRecord.timeInEvents.map(el => {
    dates.push(el.date);
  })
  let wages = [];
  for(let i = 0; i < dates.length; i++) {
    wages.push(wagesEarnedOnDate(employeeRecord, dates[i]))
  }
  return wages.reduce((a, b) => a + b, 0)
}

function calculatePayroll(employeeRecords) {
  let pay = [];
  for(let i = 0; i < employeeRecords.length; i ++) {
    pay.push(allWagesFor(employeeRecords[i]))
  }
  return pay.reduce((a, b) => a + b, 0);
}

