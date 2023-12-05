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

  day.value = String(dayValue).padStart(2, 0);
  month.value = String(monthValue).padStart(2, 0);

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

    validDate.setFullYear(validDate.getFullYear() + 1);
    while (validDate < starterDate) {
      dateIntervale.years += 1;
      validDate.setFullYear(validDate.getFullYear() + 1);
    }
    validDate.setFullYear(validDate.getFullYear() - 1);
    validDate.setMonth(validDate.getMonth() + 1);
    while (validDate < starterDate) {
      dateIntervale.months += 1;
      validDate.setMonth(validDate.getMonth() + 1);
    }
    validDate.setMonth(validDate.getMonth() - 1);
    validDate.setDate(validDate.getDate() + 1);
    while (validDate < starterDate) {
      dateIntervale.days += 1;
      validDate.setDate(validDate.getDate() + 1);
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
    if (new Date(`"${month}/${day}/${year}"`) == "Invalid Date") {
      tableOfErrors.push("invalidDate");
      return tableOfErrors;
    } else {
      return new Date(`"${month}/${day}/${year}"`);
    }
  }

  return { isEmpty, inputsError, isValidDate };
}
