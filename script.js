// javascript code
let students = [];
let editIndex = null;

document.addEventListener('DOMContentLoaded', loadData);

//function addstudent section

function addStudent(e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentId').value;
    const email = document.getElementById('studentEmail').value;
    const contact = document.getElementById('studentContact').value;

    if (students.some(s => s.id === id)) {
        alert('Student ID must be unique.');
        return;
    }

    const student = { name, id, email, contact };
    students.push(student);
    saveData();
    renderTable();
    resetForm();
}

// editstudent section

function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentContact').value = student.contact;
    document.getElementById('updateBtn').disabled = false;
    editIndex = index;
}

// updatestudent section

function updateStudent() {
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentId').value;
    const email = document.getElementById('studentEmail').value;
    const contact = document.getElementById('studentContact').value;
    students[editIndex] = { name, id, email, contact };
    saveData();
    renderTable();
    resetForm();
}
// deletestudent section
function deleteStudent(index) {
    students.splice(index, 1);
    saveData();
    renderTable();
}

function addRow(student, index) {
    const tbody = document.querySelector('#studentTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td class="action-group">
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        </td>
    `;

    tbody.appendChild(row);
}
// render table section
function renderTable() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => addRow(student, index));
}

function saveData() {
    localStorage.setItem('students', JSON.stringify(students));
}

function loadData() {
    document.getElementById('studentForm').addEventListener('submit', addStudent);
    document.getElementById('updateBtn').addEventListener('click', updateStudent);

    try {
        const data = JSON.parse(localStorage.getItem('students')) || [];
        students = data;
        renderTable();
    } catch (error) {
        console.error('Error loading data', error);
    }
}
// resetform section
function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('updateBtn').disabled = true;
    editIndex = null;
}