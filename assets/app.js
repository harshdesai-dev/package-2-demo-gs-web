(() => {
  "use strict";

  const WHATSAPP_NUMBER = "919000000000"; // Replace with the client's verified WhatsApp number.
  const ALLOWED_INTERESTS = [
    "Membership information",
    "Facilities & services",
    "Trainer information",
    "Class timetable",
    "General enquiry"
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.getElementById("primary-navigation");

    if (menuButton && navigation) {
      const closeMenu = () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
      };
      menuButton.addEventListener("click", () => {
        const opening = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(opening));
        menuButton.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
        navigation.classList.toggle("is-open", opening);
      });
      navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
          menuButton.focus();
        }
      });
      window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 981px)").matches) closeMenu();
      });
    }

    const form = document.getElementById("enquiry");
    if (!form) return;

    const query = new URLSearchParams(window.location.search);
    const plan = query.get("plan");
    const requestedInterest = query.get("interest");
    const interestSelect = form.elements.namedItem("interest");

    if (plan && interestSelect) {
      interestSelect.value = "Membership information";
    } else if (requestedInterest && interestSelect) {
      const normalized = requestedInterest.trim().toLowerCase();
      const match = ALLOWED_INTERESTS.find((item) => item.toLowerCase() === normalized);
      if (match) interestSelect.value = match;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim().replace(/\s+/g, " ");
      const rawPhone = String(data.get("phone") || "").trim();
      const digits = rawPhone.replace(/\D/g, "");
      const phone = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
      const interest = String(data.get("interest") || "");
      const message = String(data.get("message") || "").trim();
      const status = document.getElementById("status");

      if (name.length < 2 || name.length > 70) {
        status.textContent = "Please enter a name between 2 and 70 characters.";
        form.elements.namedItem("name").focus();
        return;
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        status.textContent = "Enter a valid 10-digit Indian mobile number (starting 6–9).";
        form.elements.namedItem("phone").focus();
        return;
      }
      if (!ALLOWED_INTERESTS.includes(interest)) {
        status.textContent = "Please select a valid enquiry type.";
        interestSelect.focus();
        return;
      }
      if (message.length > 500) {
        status.textContent = "Please keep your message under 500 characters.";
        form.elements.namedItem("message").focus();
        return;
      }

      const lines = [
        "Hello, I would like to enquire about Ironform Fitness Studio.",
        "Name: " + name,
        "Phone: " + phone,
        "Interested in: " + interest
      ];
      if (plan && interest === "Membership information") {
        lines.push("Selected plan: " + plan.slice(0, 80));
      }
      if (message) lines.push("Message: " + message);

      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      status.textContent = "WhatsApp is opening. Review the message and tap Send there.";
      const opened = window.open(whatsappUrl, "_blank");
      if (opened) opened.opener = null;
      if (!opened) {
        status.textContent = "Your browser blocked the new tab. Use this link to continue to WhatsApp.";
        const link = document.createElement("a");
        link.href = whatsappUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "btn";
        link.textContent = "Open WhatsApp";
        status.append(" ", link);
      }
    });
  });
})();