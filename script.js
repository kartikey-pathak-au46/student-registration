const form = document.getElementById("studentForm");
const tbody = document.querySelector("#studentTable tbody");
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function isValid(name, id, email, contact) {
  const nameValid = /^[A-Za-z\s]+$/.test(name);
  const idValid = /^\d+$/.test(id);
  const contactValid = /^\d{10}$/.test(contact);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return nameValid && idValid && contactValid && emailValid;
}

function renderTable() {
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.className = "new-row";
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>`;
    tbody.appendChild(row);
  });
}

function animateClone() {
  const clone = document.createElement("div");
  clone.className = "fly-clone";
  clone.innerText = "Student Added!";
  form.appendChild(clone);
  setTimeout(() => form.removeChild(clone), 800);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!isValid(name, studentId, email, contact)) {
    alert("Please enter valid data in all fields.");
    return;
  }

  const student = { name, studentId, email, contact };

  if (editIndex === null) {
    students.push(student);
    animateClone();
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  saveToStorage();
  form.reset();
  renderTable();
});

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Delete this student record?")) {
    students.splice(index, 1);
    saveToStorage();
    renderTable();
  }
}

renderTable();



function spawnBubble() {
  const container = document.querySelector(".bubbles");
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = Math.random() * 30 + 10;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.animationDuration = Math.random() * 5 + 5 + "s";

  container.appendChild(bubble);
  setTimeout(() => container.removeChild(bubble), 12000);
}

// 
setInterval(spawnBubble, 200);
