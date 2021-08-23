let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromLocalStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salry</th><th>Start Date</th><th>Actions</th>";
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
        <tr>
            <td width="5%"><img class="profile" alt="Profileimge" src="${empPayrollData._profile}" ></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${(empPayrollData._startDate)}</td>
            <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assests/homepage/delete-black-18dp.svg">
            <img id="${empPayrollData._id}" onclick="update(this)" alt="Update" src="../assests/homepage/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display-table').innerHTML = innerHtml;
}

const getDeptHtml = (depList)=>{
    let deptHtml = '';
    for(const dept of depList){
        deptHtml = `${deptHtml} <div class='dept-lable'>${dept}</div>`
    }
    return deptHtml;
}