// ===== Countdown (7 days) =====
function startCountdown(days=7){
  const end = new Date().getTime() + days*24*60*60*1000;
  const el = document.getElementById("countdown");
  if(!el) return;

  const tick = () => {
    const now = new Date().getTime();
    const diff = end - now;
    if (diff <= 0){
      el.innerHTML = "<span class='closed'>⏰ Registration Closed</span>";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff/(1000*60*60*24));
    const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const m = Math.floor((diff%(1000*60*60))/(1000*60));
    const s = Math.floor((diff%(1000*60))/1000);
    el.innerHTML = `<div class='timer'><span>${d}d</span>:<span>${h}h</span>:<span>${m}m</span>:<span>${s}s</span></div>`;
  };
  tick();
  const timer = setInterval(tick, 1000);
}
document.addEventListener("DOMContentLoaded", ()=> startCountdown(7));


// ===== Helpers =====
const SESSION_KEY = "current_member_id";

function getMembers(){ return JSON.parse(localStorage.getItem("members") || "[]"); }
function saveMembers(members){ localStorage.setItem("members", JSON.stringify(members)); }
function uid(){ return "M" + Math.random().toString(36).substr(2,9); }
  