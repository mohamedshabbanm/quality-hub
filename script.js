
"use strict";

/* =========================
   HELPER FUNCTIONS
========================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = $("#menuToggle");
const navigation = $("#navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "CLOSE −" : "INDEX +";
  });

  $$(".nav a", navigation).forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "INDEX +";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      navigation.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "INDEX +";
      menuToggle.focus();
    }
  });
}


/* =========================
   INTERACTIVE BUG CASE FILES
========================= */

const bugCases = {
  login: {
    id: "BUG-001 / FUNCTIONAL",

    title:
      "Login form submits without required-field feedback",

    severity:
      "PROPOSED SEVERITY: MAJOR",

    status: "FAIL",

    description:
      "Submitting the login form while both fields are empty does not provide clear field-level validation feedback.",

    steps: [
      "1. Open the login page.",
      "2. Leave the email and password fields empty.",
      "3. Click the Sign in button."
    ],

    expected:
      "Required-field validation is displayed, and invalid data is not submitted.",

    actual:
      "No clear validation message appears after submission.",

    area:
      "Authentication / Login",

    impact:
      "Unclear recovery from input errors"
  },

  cart: {
    id: "BUG-002 / FUNCTIONAL",

    title:
      "Cart total is not recalculated after item removal",

    severity:
      "PROPOSED SEVERITY: HIGH",

    status: "FAIL",

    description:
      "In this hypothetical checkout scenario, removing an item updates the item list but leaves the previously calculated order total unchanged.",

    steps: [
      "1. Add two items to the cart.",
      "2. Record the displayed subtotal and total.",
      "3. Remove one item and inspect the totals."
    ],

    expected:
      "The subtotal, applicable fees, and final total are recalculated from the remaining items.",

    actual:
      "The item disappears, but the displayed total remains at its previous value.",

    area:
      "Shopping Cart / Checkout",

    impact:
      "Potentially incorrect order amount"
  },

  mobile: {
    id: "BUG-003 / RESPONSIVE UI",

    title:
      "Mobile navigation overlaps the primary action",

    severity:
      "PROPOSED SEVERITY: MEDIUM",

    status: "FAIL",

    description:
      "In this hypothetical responsive-layout scenario, the expanded navigation overlaps the main call-to-action on a narrow viewport.",

    steps: [
      "1. Open the page in a narrow mobile viewport.",
      "2. Expand the navigation menu.",
      "3. Inspect the menu and primary action."
    ],

    expected:
      "Navigation items and the primary action remain visible, readable, and usable.",

    actual:
      "The menu overlays part of the primary action, making it difficult to use.",

    area:
      "Responsive UI / Navigation",

    impact:
      "Reduced usability on small screens"
  }
};


/* =========================
   UPDATE REPORT CONTENT
========================= */

function setText(id, value) {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(`Element not found: #${id}`);
    return;
  }

  element.textContent = value;
}


function renderBugCase(caseKey) {
  const bug = bugCases[caseKey];

  if (!bug) {
    console.error(`Unknown bug case: ${caseKey}`);
    return;
  }

  setText("reportId", bug.id);
  setText("reportTitle", bug.title);
  setText("reportSeverity", bug.severity);
  setText("reportStatus", bug.status);
  setText("reportDescription", bug.description);
  setText("reportExpected", bug.expected);
  setText("reportActual", bug.actual);
  setText("reportArea", bug.area);
  setText("reportImpact", bug.impact);

  /* Rebuild the reproduction steps safely */
  const stepsContainer = $("#reportSteps");

  if (stepsContainer) {
    stepsContainer.replaceChildren();

    bug.steps.forEach((step) => {
      const paragraph = document.createElement("p");

      paragraph.textContent = step;
      stepsContainer.appendChild(paragraph);
    });
  }

  /* Update the status appearance */
  const statusElement = $("#reportStatus");

  if (statusElement) {
    statusElement.classList.remove(
      "status-fail",
      "status-pass"
    );

    statusElement.classList.add(
      bug.status === "PASS" ? "status-pass" : "status-fail"
    );
  }

  /* Update the selected case button */
  $$(".scenario-button").forEach((button) => {
    const isActive = button.dataset.case === caseKey;

    button.classList.toggle("active", isActive);

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}


/* Attach an event to each case button */

$$(".scenario-button").forEach((button) => {
  button.addEventListener("click", () => {
    renderBugCase(button.dataset.case);
  });
});


/* =========================
   SCROLL REVEAL ANIMATIONS
========================= */

const revealItems = $$(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("shown");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  /* Keep all content visible if animations are disabled */
  revealItems.forEach((element) => {
    element.classList.add("shown");
  });
}


/* =========================
   CURRENT FOOTER YEAR
========================= */

const yearElement = $("#year");

if (yearElement) {
  yearElement.textContent = `© ${new Date().getFullYear()}`;
}


/* =========================
   INITIALIZE THE PORTFOLIO
========================= */

renderBugCase("login");
