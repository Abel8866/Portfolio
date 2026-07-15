document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const typedWord = document.getElementById("typed-word");
  const year = document.getElementById("year");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  const words = ["modern web solutions", "student-focused systems", "clean user interfaces", "practical digital products"];
  let wordIndex = 0;
  if (typedWord) {
    setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      typedWord.textContent = words[wordIndex];
    }, 1800);
  }

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((item) => observer.observe(item));

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        return;
      }

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmail.test(email)) {
        status.textContent = "Please enter a valid email address.";
        return;
      }

      status.textContent = "Message sent successfully!";
      form.reset();
      setTimeout(() => {
        status.textContent = "";
      }, 3000);
    });
  }
});
