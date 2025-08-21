// ===== Admin Dashboard =====

// Protect admin page
if(sessionStorage.getItem("isAdmin") !== "true"){
  alert("You must login as Admin first.");
  window.location.href = "admin-login.html";
}

const members = getMembers();
const tbody = document.querySelector("#memberTable tbody");

function renderMembers(){
  tbody.innerHTML = "";
  members.forEach((m, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${m.fullName}</td>
      <td>${m.email}</td>
      <td>${m.phone}</td>
      <td>${m.lga}</td>
      <td>${m.category}</td>
      <td>${m.cdcfibId}</td>
      <td>${m.status}</td>
      <td>
        <button class="btn primary" onclick="approveMember('${m.id}')">Approve</button>
        <button class="btn danger" onclick="rejectMember('${m.id}')">Reject</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function approveMember(id){
  const m = members.find(x => x.id === id);
  if(m){
    m.status = "Approved ✅";
    saveMembers(members);
    renderMembers();
  }
}

function rejectMember(id){
  const m = members.find(x => x.id === id);
  if(m){
    m.status = "Rejected ❌";
    saveMembers(members);
    renderMembers();
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("isAdmin");
  window.location.href = "admin-login.html";
});

renderMembers();
