// payment.js (fixed + consistent session handling)

document.addEventListener("DOMContentLoaded", () => {
  const payBtn = document.getElementById("payBtn");
  if (!payBtn) {
    console.error("❌ ERROR: Button with id 'payBtn' not found!");
    return;
  }

  payBtn.addEventListener("click", function () {
    const members = getMembers();
    const memberId = sessionStorage.getItem(SESSION_KEY); // ✅ from common.js
    console.log("🔑 Retrieved session memberId:", memberId);

    const member = members.find(m => m.id === memberId);
    console.log("🔎 Found member:", member);

    if (member) {
      member.status = "Paid ✅";
      saveMembers(members);
      console.log("💾 Updated member status:", member);

      const msg = document.getElementById("paymentMsg");
      if (msg) {
        msg.textContent = "✅ Payment successful! Redirecting to your card...";
        msg.className = "msg success";
        msg.style.display = "block";
      }

      setTimeout(() => {
        window.location.href = "card.html"; // redirect after 2s
      }, 2000);
    } else {
      const msg = document.getElementById("paymentMsg");
      if (msg) {
        msg.textContent = "❌ Member not found. Please register again.";
        msg.className = "msg err";
        msg.style.display = "block";
      }
    }
  });
});
