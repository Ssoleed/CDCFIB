// register.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const SESSION_KEY = "current_member_id";

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const lga = document.getElementById("lga").value;
    const address = document.getElementById("address").value.trim();
    const category = document.getElementById("category").value;
    const cdcfibId = document.getElementById("cdcfibId").value.trim();
    const password = document.getElementById("password").value.trim();
    const passportFile = document.getElementById("passport").files[0];

    if (!fullName || !email || !phone || !lga || !address || !category || !cdcfibId || !password || !passportFile) {
      alert("⚠️ Please fill in all required fields, including passport.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const passportBase64 = e.target.result;

      let members = JSON.parse(localStorage.getItem("members") || "[]");

      const newMember = {
        id: "M" + Math.random().toString(36).substr(2,9),
        name: fullName,
        email,
        phone,
        lga,
        address,
        category,
        cdcfibId,
        password,
        passport: passportBase64,
        status: "pending"
      };

      members.push(newMember);
      localStorage.setItem("members", JSON.stringify(members));
      sessionStorage.setItem(SESSION_KEY, newMember.id);

      window.location.href = "payment.html";
    };
    reader.readAsDataURL(passportFile);
  });
});
