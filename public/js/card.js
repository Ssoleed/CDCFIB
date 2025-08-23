// card.js
const SESSION_KEY = "current_member_id";

function getMembers() {
  return JSON.parse(localStorage.getItem("members")) || [];
}

const members = getMembers();
const memberId = sessionStorage.getItem(SESSION_KEY);
const member = members.find(m => m.id === memberId);

if (!member) {
  alert("❌ No member found. Please register again.");
  window.location.href = "register.html";
} else if (member.status !== "paid") {
  alert("❌ You must complete payment before downloading your ID card.");
  window.location.href = "payment.html";
} else {
  // Fill card details
  document.getElementById("memberName").textContent = member.name;
  document.getElementById("memberEmail").textContent = member.email;
  document.getElementById("memberId").textContent = member.id;
  document.getElementById("memberStatus").textContent = member.status;

  const photo = document.getElementById("passport"); 
  photo.src = member.passport || "images/default-avatar.png";

  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const card = document.querySelector(".card");
      html2canvas(card).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${member.name}_ID_Card.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  }
}
