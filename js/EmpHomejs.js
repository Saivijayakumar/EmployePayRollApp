window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salry</th><th>Start Date</th><th>Actions</th>";
    const innerHtml = `${headerHtml}
        <tr>
            <td><img class="profile" alt="Profileimge" src="../assests/Ellipse -8.png" ></td>
            <td>SaiVijaya</td>
            <td>Male</td>
            <td>
                <div class="dept-lable">HR</div>
                <div class="dept-lable">Finance</div>
            </td>
            <td>600000</td>
            <td>1 avg 2021</td>
            <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assests/homepage/delete-black-18dp.svg">
            <img id="1" onclick="update(this)" alt="Update" src="../assests/homepage/create-black-18dp.svg">
            </td>
        </tr>
    `;
    document.querySelector('#display-table').innerHTML = innerHtml;
}