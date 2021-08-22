window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const date = document.querySelector('#startDate');
    date.addEventListener('input', function () {
        let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        try {
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.startDate-error', "");
        }
        catch (e) {
            setTextValue('.startDate-error', e);
        }
    });


    const salary = document.querySelector('#salary');
    const salaryOutput = document.querySelector('.salary-output');
    salaryOutput.textContent = salary.value;
    salary.addEventListener('input', function () {
        salaryOutput.textContent = salary.value;
    });
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
    }
    catch (e) {
        return;
    }
}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");

    try {
        employeePayrollData.startDate = new Date(Date.parse(date));
        setTextValue(".startDate-error", "");
    }
    catch (e) {
        setTextValue('.startDate-error', e);
    }
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}