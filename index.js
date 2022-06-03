function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  let employeeRecords = [];
  employees.map((employee) => {
    employeeRecords.push(createEmployeeRecord(employee));
  });
  return employeeRecords;
}

function createTimeInEvent(time) {
  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(time.split(" ")[1]),
    date: time.split(" ")[0],
  };
  this.timeInEvents.push(timeInEvent);
  return this;
}

function createTimeOutEvent(time) {
  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(time.split(" ")[1]),
    date: time.split(" ")[0],
  };
  this.timeOutEvents.push(timeOutEvent);
  return this;
}

function hoursWorkedOnDate(date) {
  let dayIn = this.timeInEvents.find((day) => {
    return day.date === date;
  });

  let dayOut = this.timeOutEvents.find((day) => {
    return day.date === date;
  });

  return (dayOut.hour - dayIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  let payroll = 0;
  employeeRecords.forEach((rec) => {
    return (payroll += allWagesFor.call(rec));
  });
  return payroll;
}
