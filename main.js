const submitButton = document.getElementById("submitBtn");
const resultYear = document.getElementById("yearResult");
const resultMonth = document.getElementById("monthResult");
const resultDay = document.getElementById("dayResult");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

[day, month, year].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    e.key === "Enter" ? submitAge() : null;
  });
});

submitButton.addEventListener("click", submitAge);

function submitAge() {
  const dayValue = day.value;
  const monthValue = month.value;
  const yearValue = year.value;

  const inputField = document.getElementById("inputField");
  const validate = getErrorsOfInputs(dayValue, monthValue, yearValue).isEmpty().length
    ? getErrorsOfInputs(dayValue, monthValue, yearValue)
        .isEmpty()
        .map((emptyError) => inputField.classList.toggle(emptyError))
    : getErrorsOfInputs(dayValue, monthValue, yearValue).inputsError().length
    ? getErrorsOfInputs(dayValue, monthValue, yearValue)
        .inputsError()
        .map((error) => inputField.classList.toggle(error))
    : getErrorsOfInputs(dayValue, monthValue, yearValue).isValidDate().length
    ? getErrorsOfInputs(dayValue, monthValue, yearValue)
        .isValidDate()
        .map((error) => inputField.classList.toggle(error))
    : getErrorsOfInputs(dayValue, monthValue, yearValue).isValidDate();
  if (!validate.length) {
    day.value = String(dayValue).padStart(2, 0);
    month.value = String(monthValue).padStart(2, 0);
    const starterDate = new Date();
    starterDate.setHours(0);
    starterDate.setMinutes(0);
    starterDate.setSeconds(0);

    let validDate = new Date(validate);
    const dateIntervale = {
      years: 0,
      months: 0,
      days: 0,
    };
    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth() + 1;
    const dayNow = new Date().getDate();

    dateIntervale.years = yearNow - validDate.getFullYear();

    if (validDate.getMonth() <= monthNow) {
      dateIntervale.months = monthNow - validDate.getMonth();
    } else {
      dateIntervale.years--;
      dateIntervale.months = 12 - (monthNow - validDate.getMonth());
    }

    if (validDate.getDate() <= dayNow) {
      dateIntervale.days = dayNow - validDate.getDate();
    } else {
      dateIntervale.months--;
      let days = 31;
      if ([1, 5, 7, 10, 12].includes(monthNow)) days = 30;
      if (monthNow == 3) days = 28;
      dateIntervale.days = days - (dayNow - validDate.getDate());
    }

    resultDay.textContent = dateIntervale.days;
    resultMonth.textContent = dateIntervale.months;
    resultYear.textContent = dateIntervale.years;
  }
}

function getErrorsOfInputs(day, month, year) {
  inputField.removeAttribute("class");
  const tableOfErrors = [];

  function isEmpty() {
    if (!day.length) tableOfErrors.push("dayEmpty");
    if (!month.length) tableOfErrors.push("monthEmpty");
    if (!year.length) tableOfErrors.push("yearEmpty");
    return tableOfErrors;
  }

  function inputsError() {
    if (parseInt(day) > 31) tableOfErrors.push("dayError");
    if (parseInt(month) > 12) tableOfErrors.push("monthError");
    if (parseInt(year) > new Date().getFullYear()) tableOfErrors.push("yearError");
    return tableOfErrors;
  }

  function isValidDate() {
    const date = new Date();
    date.setMonth(month);
    date.setDate(day);
    date.setFullYear(year);
    const confirmationDate = new Date(date);
    if (confirmationDate == "Invalid Date" || confirmationDate.getTime() > new Date().getTime()) {
      tableOfErrors.push("invalidDate");
      return tableOfErrors;
    } else {
      return date;
    }
  }

  return { isEmpty, inputsError, isValidDate };
}
