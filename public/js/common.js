// common.js

// ===== Countdown =====
function startCountdown(days = 7, countdownElId = "countdown") {
  const endTime = Date.now() + days * 24 * 60 * 60 * 1000;
  const el = document.getElementById(countdownElId);
  if (!el) return;

  const tick = () => {
    const now = Date.now();
    const diff = endTime - now;

    if (diff <= 0) {
      el.innerHTML = "<span class='closed'>⏰ Registration Closed</span>";
      clearInterval(timer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    el.innerHTML = `<div class='timer'><span>${d}d</span>:<span>${h}h</span>:<span>${m}m</span>:<span>${s}s</span></div>`;
  };

  tick();
  const timer = setInterval(tick, 1000);
}

// Auto-start countdown on DOM load
document.addEventListener("DOMContentLoaded", () => {
  startCountdown(7, "time"); // default for register.html and index.html
});

// ===== Helpers =====
const SESSION_KEY = "current_member_id";

// Retrieve all members from localStorage
function getMembers() {
  return JSON.parse(localStorage.getItem("members") || "[]");
}

// Save all members to localStorage
function saveMembers(members) {
  localStorage.setItem("members", JSON.stringify(members));
}

// Generate unique member ID
function uid() {
  return "M" + Math.random().toString(36).substr(2, 9);
}

// Get currently logged-in member
function getCurrentMember() {
  const members = getMembers();
  const memberId = sessionStorage.getItem(SESSION_KEY);
  return members.find(m => m.id === memberId) || null;
}

// Check if current member has paid
function isPaid() {
  const member = getCurrentMember();
  return member && member.status === "paid";
}
