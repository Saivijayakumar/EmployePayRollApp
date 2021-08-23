window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salry</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = creteEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
        <tr>
            <td width="5%"><img class="profile" alt="Profileimge" src="${empPayrollData._profile}" ></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
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

const creteEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            "_name": "Mohit kumar new",
            "_gender": "male",
            "_department": [
                "HR"
            ],
            "_salary": "30000",
            "_startDate": "1 Avg 2021",
            "_note": "",
            "_id": new Date().getTime(),
            "_profile": "../assests/Ellipse -8.png"
        },
        {
            "_name": "Mohit kumar",
            "_gender": "male",
            "_department": [
                "HR", "Sales"
            ],
            "_salary": "30000",
            "_startDate": "12 Avg 2021",
            "_note": "",
            "_id": new Date().getTime() + 1,
            "_profile": "../assests/Ellipse -7.png"
        }
    ];
    return empPayrollListLocal;
}