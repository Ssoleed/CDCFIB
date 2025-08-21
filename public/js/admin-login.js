// ===== Admin Login =====
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234"; // You can change this

document.getElementById("adminLoginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value.trim();

  if(user === ADMIN_USER && pass === ADMIN_PASS){
    sessionStorage.setItem("isAdmin", "true");
    window.location.href = "admin.html"; // redirect to dashboard
  } else {
    document.getElementById("adminMsg").textContent = "❌ Invalid login details";
    document.getElementById("adminMsg").className = "msg err";
    document.getElementById("adminMsg").style.display = "block";
  }
});
