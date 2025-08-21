// card.js — Selar version (keeps your original DOM + logic)

// Uses SESSION_KEY from common.js: const SESSION_KEY = "current_member_id";
const STORAGE_KEY = "members";
const SELAR_LINK = "https://selar.com/1ew6qi0736";

// Get current member from session/localStorage
const memberId = sessionStorage.getItem(SESSION_KEY);
const members = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const member = members.find(m => m.id === memberId);

// DOM refs (same ids you used before)
const memberName  = document.getElementById("memberName");
const memberEmail = document.getElementById("memberEmail");
const memberPhone = document.getElementById("memberPhone");
const memberPhoto = document.getElementById("memberPhoto");
const payBtn      = document.getElementById("payBtn");

// Guard: no member in session
if (!member) {
  alert("❌ No member found. Please register again.");
  window.location.href = "register.html";
} else {
  // Populate UI (unchanged)
  if (memberName)  memberName.textContent  = `Name: ${member.name}`;
  if (memberEmail) memberEmail.textContent = `Email: ${member.email}`;
  if (memberPhone) memberPhone.textContent = `Phone: ${member.phone}`;
  if (memberPhoto) memberPhoto.style.backgroundImage = `url('https://via.placeholder.com/120')`;

  // Optional: show status if you have <p id="status"></p> in HTML
  const statusEl = document.getElementById("status");
  if (statusEl) {
    statusEl.textContent = member.status === "paid" ? "✅ Paid Member" : "⏳ Pending Payment";
  }
}

// Pay button -> redirect to Selar product page
if (payBtn) {
  payBtn.addEventListener("click", function () {
    if (!member) return;

    // Mark as pending (so you can track they initiated payment)
    member.status = "pending";
    const updated = members.map(m => (m.id === member.id ? member : m));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Go to Selar checkout
    window.location.href = SELAR_LINK;
  });
}
