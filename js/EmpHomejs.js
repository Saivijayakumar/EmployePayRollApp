let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_Local_Storage.match("true"))
        getEmployeePayrollDataFromLocalStorage();
    else
        getEmployeePayrollDataFromServer();
});
const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromLocalStorage = () => {
    empPayrollList = localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_Url, true)
        .then(responseText => {
            empPayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error status: " + JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salry</th><th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td width="5%"><img class="profile" alt="Profileimge" src="${empPayrollData._profile}" ></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
            <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" src="../assests/homepage/delete-black-18dp.svg">
            <img id="${empPayrollData.id}" onclick="update(this)" alt="Update" src="../assests/homepage/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display-table').innerHTML = innerHtml;
}

const getDeptHtml = (depList) => {
    let deptHtml = '';
    for (const dept of depList) {
        deptHtml = `${deptHtml} <div class='dept-lable'>${dept}</div>`
    }
    return deptHtml;
}
//Deleteing employee when you click on delete in home page
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if (!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._name).indexOf(empPayrollData._name);
    empPayrollList.splice(index, 1);
    if (site_properties.use_Local_Storage.match("true")) {
        localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent = empPayrollList.length;
        createInnerHtml();
    }
    else {
        const deleteURL = site_properties.server_Url + empPayrollData.id.toString();
        makeServiceCall("DELETE", deleteURL, false)
            .then(responseText => {
                document.querySelector(".emp-count").textContent = empPayrollList.length;
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status:" + JSON.stringify(error));
            });
    }
}
//when click on update we will store that details into an object and send that obj to local storage
const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if (!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    window.location.replace(site_properties.Form_Page);
}