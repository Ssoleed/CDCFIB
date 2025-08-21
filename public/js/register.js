// register.js (fixed + debug logs)

console.log("📌 register.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  
  if (!form) {
    console.error("❌ ERROR: Form with id 'registerForm' not found!");
    return;
  }

  console.log("✅ Found registerForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("📩 Form submitted");

    // Collect inputs
    const fullName = document.getElementById("fullName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const lga = document.getElementById("lga")?.value;
    const address = document.getElementById("address")?.value.trim();
    const category = document.getElementById("category")?.value;
    const cdcfibId = document.getElementById("cdcfibId")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    console.log("📋 Collected data:", { fullName, email, phone, lga, address, category, cdcfibId, password });

    // Validate required fields
    if (!fullName || !email || !phone || !lga || !address || !category || !cdcfibId || !password) {
      console.warn("⚠️ Validation failed: Missing fields");
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    // Get existing members
    let members = getMembers();
    console.log("📂 Current members:", members);

    // Create new member
    const newMember = {
      id: uid(), // from common.js
      name: fullName,
      email,
      phone,
      lga,
      address,
      category,
      cdcfibId,
      password,
      status: "pending"
    };

    console.log("🆕 New member created:", newMember);

    // Save to localStorage
    members.push(newMember);
    saveMembers(members);
    console.log("💾 Member saved. All members now:", members);

    // Save session (✅ use SESSION_KEY from common.js)
    sessionStorage.setItem(SESSION_KEY, newMember.id);
    console.log("🔑 Session stored:", SESSION_KEY, "=", sessionStorage.getItem(SESSION_KEY));

   // Redirect to Selar product page
console.log("➡️ Redirecting to Selar checkout...");
window.location.href = "https://selar.com/1ew6qi0736";
  });
});
