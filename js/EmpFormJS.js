let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const date = document.querySelector('#startDate');
    date.addEventListener('input', function () {
        let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        try {
            checkStartDate(new Date(Date.parse(startDate)));
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
    document.querySelector('.cancleButton').href = site_properties.home_page;
    checkForUpdate();
});
//
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        restForm();
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        return;
    }
}
//
const createAndUpdateStorage =()=>{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData=>empData.id == employeePayrollObj.id);
        if(!empPayrollData){
            employeePayrollList.push(employeePayrollObj);
        }else{
            const index = employeePayrollList.map(empData=>empData.id).indexOf(empPayrollData.id);
            employeePayrollList.splice(index,1,employeePayrollObj);
        }
    }else{
        employeePayrollList = [employeePayrollObj];
    }
    localStorage.setItem('EmployeePayrollList',JSON.stringify(employeePayrollList));
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
const restForm = () => {
    setTextValue('#name', '');
    unsetSelectedValues('[name=profile');
    unsetSelectedValues('[name=gender');
    unsetSelectedValues('[name=department');
    setValue('#salary', '');
    setTextValue('.salary-output', 400000)
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'Jan');
    setValue('#year', '2021');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
//Update part
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}
//It help to fill the details of EMP in the form
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profile);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObj._note);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
}
//storeing the data to local storage
const setEmployeePayrollObject = () => {
    if(!isUpdate)employeePayrollObj.id=createNewEmployeeId();
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profile=getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department=getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day') +" "+getInputValueById('#month')+ " "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

const createEmployeePayrollData = (id)=>{
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profile = employeePayrollObj._profile;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    }
    catch (e) {
        setTextValue('.startDate-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () =>{
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}