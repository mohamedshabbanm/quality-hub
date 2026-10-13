
"use strict";

/* =========================================
   HELPERS
========================================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = $("#menuToggle");
const navigation = $("#navigation");

function closeNavigation() {
  if (!menuToggle || !navigation) return;

  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "INDEX +";
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "CLOSE −" : "INDEX +";
  });

  $$(".nav a", navigation).forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}


/* =========================================
   PAGE SCROLL PROGRESS
========================================= */

let scrollFrame = false;

function updateScrollProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  const bar = $("#pageProgress");

  if (bar) bar.style.width = `${progress}%`;

  scrollFrame = false;
}

window.addEventListener("scroll", () => {
  if (scrollFrame) return;

  scrollFrame = true;
  window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });

updateScrollProgress();


/* =========================================
   CURSOR LIGHT
========================================= */

const cursorGlow = $("#cursorGlow");

if (cursorGlow && !reducedMotion) {
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (finePointer) {
    document.body.classList.add("has-pointer");

    window.addEventListener("pointermove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }
}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems = $$(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("shown");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealItems.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(element);
  });
} else {
  revealItems.forEach((element) => {
    element.classList.add("shown");
  });
}


/* =========================================
   ACTIVE NAVIGATION SECTION
========================================= */

const navLinks = $$(".nav a[href^='#']");

const navSections = navLinks
  .map((link) => $(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        const active =
          link.getAttribute("href") === `#${visible.target.id}`;

        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.15, 0.35]
    }
  );

  navSections.forEach((section) => navObserver.observe(section));
}


/* =========================================
   BUG CASE FILE DATA
========================================= */

const bugCases = {
  login: {
    id: "BUG-001 / FUNCTIONAL",
    title: "Login form submits without required-field feedback",
    severity: "PROPOSED SEVERITY: MAJOR",
    status: "FAIL",

    description:
      "In this illustrative scenario, submitting an empty login form does not provide clear field-level validation feedback.",

    steps: [
      "1. Open the login page.",
      "2. Leave the email and password fields empty.",
      "3. Click the Sign in button."
    ],

    expected:
      "Required-field validation is displayed, and invalid data is not submitted.",

    actual:
      "No clear validation message appears after submission.",

    area: "Authentication / Login",
    impact: "Unclear recovery from input errors"
  },

  cart: {
    id: "BUG-002 / FUNCTIONAL",
    title: "Cart total is not recalculated after item removal",
    severity: "PROPOSED SEVERITY: HIGH",
    status: "FAIL",

    description:
      "In this illustrative checkout scenario, removing an item updates the item list but leaves the previous order total unchanged.",

    steps: [
      "1. Add two items to the shopping cart.",
      "2. Record the displayed subtotal and total.",
      "3. Remove one item.",
      "4. Compare the updated cart with the displayed totals."
    ],

    expected:
      "The subtotal, applicable fees, and final total are recalculated from the remaining items.",

    actual:
      "The item disappears, but the displayed total remains unchanged.",

    area: "Shopping Cart / Checkout",
    impact: "Potentially incorrect order amount"
  },

  mobile: {
    id: "BUG-003 / RESPONSIVE UI",
    title: "Mobile navigation overlaps the primary action",
    severity: "PROPOSED SEVERITY: MEDIUM",
    status: "FAIL",

    description:
      "In this illustrative responsive-layout scenario, the expanded navigation overlaps the main call-to-action at a narrow viewport.",

    steps: [
      "1. Open the page in a narrow mobile viewport.",
      "2. Expand the navigation menu.",
      "3. Inspect the menu and primary action."
    ],

    expected:
      "Navigation items and the primary action remain visible, readable, and usable.",

    actual:
      "The expanded menu overlaps part of the primary action.",

    area: "Responsive UI / Navigation",
    impact: "Reduced usability on small screens"
  }
};


/* =========================================
   RENDER A BUG REPORT
========================================= */

function renderBugCase(caseKey) {
  const bug = bugCases[caseKey];

  if (!bug) {
    console.error(`Unknown case: ${caseKey}`);
    return;
  }

  const report = $(".report");

  if (report && !reducedMotion) {
    report.style.animation = "none";
    void report.offsetWidth;
    report.style.animation = "";
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

  const stepsContainer = $("#reportSteps");

  if (stepsContainer) {
    stepsContainer.replaceChildren();

    bug.steps.forEach((step) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = step;
      stepsContainer.appendChild(paragraph);
    });
  }

  const statusElement = $("#reportStatus");

  if (statusElement) {
    statusElement.classList.remove("status-fail", "status-pass");
    statusElement.classList.add(
      bug.status === "PASS" ? "status-pass" : "status-fail"
    );
  }

  $$(".scenario-button").forEach((button) => {
    const active = button.dataset.case === caseKey;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const feedback = $("#copyFeedback");

  if (feedback) feedback.textContent = "";
}


/* Case list controls */

$$(".scenario-button").forEach((button) => {
  button.addEventListener("click", () => {
    renderBugCase(button.dataset.case);
  });
});


/* Interactive nodes attached to the illustration */

$$("[data-scene-case]").forEach((node) => {
  node.addEventListener("click", () => {
    const caseKey = node.dataset.sceneCase;

    renderBugCase(caseKey);

    const scene = $("#bugScene");
    if (scene) {
      scene.classList.remove("node-selected");
      void scene.offsetWidth;
      scene.classList.add("node-selected");
    }

    $("#lab")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});


/* =========================================
   COPY BUG REPORT SUMMARY
========================================= */

function buildReportSummary(bug) {
  return [
    bug.id,
    `Title: ${bug.title}`,
    `Proposed severity: ${bug.severity}`,
    `Description: ${bug.description}`,
    "",
    "Steps to reproduce:",
    ...bug.steps,
    "",
    `Expected result: ${bug.expected}`,
    `Actual result: ${bug.actual}`,
    `Area: ${bug.area}`,
    `Potential user impact: ${bug.impact}`,
    "",
    "Note: Illustrative portfolio example; not a verified client defect."
  ].join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporary = document.createElement("textarea");

  temporary.value = text;
  temporary.setAttribute("readonly", "");
  temporary.style.position = "fixed";
  temporary.style.opacity = "0";

  document.body.appendChild(temporary);
  temporary.select();

  const copied = document.execCommand("copy");
  temporary.remove();

  if (!copied) {
    throw new Error("Copy operation was not available.");
  }
}

$("#copyReport")?.addEventListener("click", async () => {
  const activeButton = $(".scenario-button.active");
  const caseKey = activeButton?.dataset.case || "login";
  const bug = bugCases[caseKey];

  if (!bug) return;

  try {
    await copyText(buildReportSummary(bug));

    setText("copyFeedback", "REPORT SUMMARY COPIED.");
    showToast("Case summary copied to clipboard.");
  } catch {
    setText("copyFeedback", "COPY FAILED — SELECT AND COPY MANUALLY.");
  }
});


/* =========================================
   LIVE TEST SIMULATION
========================================= */

/*
  These are intentionally simulated outcomes.
  No real application or API is contacted.
*/

const simulatedTests = [
  {
    id: "TC-001",
    name: "Login with valid credentials",
    result: "PASS",
    detail: "Simulated successful-login scenario."
  },
  {
    id: "TC-002",
    name: "Required-field validation",
    result: "FAIL",
    detail: "Simulated missing-validation finding."
  },
  {
    id: "TC-003",
    name: "Cart total recalculation",
    result: "FAIL",
    detail: "Simulated cart-calculation finding."
  },
  {
    id: "TC-004",
    name: "Responsive navigation visibility",
    result: "PASS",
    detail: "Simulated responsive-layout check."
  },
  {
    id: "TC-005",
    name: "Checkout with missing address",
    result: "BLOCKED",
    detail: "Simulated blocked test pending prerequisite setup."
  }
];

let testRunInProgress = false;
let testRunToken = 0;

function resetTestConsole() {
  $$(".test-row").forEach((row) => {
    row.classList.remove("running");

    const result = $(".test-result", row);

    if (result) {
      result.className = "test-result pending";
      result.textContent = "PENDING";
    }
  });

  setText("passCount", "0");
  setText("failCount", "0");
  setText("blockedCount", "0");
  setText("totalCount", String(simulatedTests.length));
  setText("runMessage", "Ready. This is a simulated test run.");

  const progress = $("#runProgress");
  if (progress) progress.style.width = "0%";

  const indicator = $("#runIndicator");
  if (indicator) {
    indicator.className = "run-indicator";
    indicator.textContent = "● IDLE";
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTestSuite() {
  if (testRunInProgress) return;

  testRunInProgress = true;
  const token = ++testRunToken;

  const runButton = $("#runTests");
  const runLabel = $("#runButtonLabel");
  const indicator = $("#runIndicator");

  if (runButton) runButton.disabled = true;
  if (runLabel) runLabel.textContent = "EXECUTING...";
  if (indicator) {
    indicator.className = "run-indicator running";
    indicator.textContent = "● RUNNING";
  }

  resetTestConsole();

  if (indicator) {
    indicator.className = "run-indicator running";
    indicator.textContent = "● RUNNING";
  }

  let passed = 0;
  let failed = 0;
  let blocked = 0;

  setText("runMessage", "Initializing simulated test execution...");

  for (let index = 0; index < simulatedTests.length; index++) {
    if (token !== testRunToken) return;

    const test = simulatedTests[index];
    const row = $(`.test-row[data-test="${index}"]`);
    const result = row ? $(".test-result", row) : null;

    if (row) row.classList.add("running");
    if (result) {
      result.className = "test-result running";
      result.textContent = "RUNNING";
    }

    setText("runMessage", `Executing ${test.id} — ${test.name}`);

    await delay(reducedMotion ? 20 : 650);

    if (token !== testRunToken) return;

    if (row) row.classList.remove("running");

    if (result) {
      result.className = `test-result ${test.result.toLowerCase()}`;
      result.textContent = test.result;
    }

    if (test.result === "PASS") passed++;
    if (test.result === "FAIL") failed++;
    if (test.result === "BLOCKED") blocked++;

    setText("passCount", String(passed));
    setText("failCount", String(failed));
    setText("blockedCount", String(blocked));

    const progress = $("#runProgress");
    if (progress) {
      progress.style.width =
        `${((index + 1) / simulatedTests.length) * 100}%`;
    }
  }

  if (token !== testRunToken) return;

  if (indicator) {
    indicator.className = "run-indicator complete";
    indicator.textContent = "● COMPLETED";
  }

  setText(
    "runMessage",
    `Simulation finished: ${passed} passed, ${failed} failed, ${blocked} blocked.`
  );

  if (runLabel) runLabel.textContent = "RUN AGAIN ↻";
  if (runButton) runButton.disabled = false;

  testRunInProgress = false;

  showToast("Simulated test run completed.");
}

$("#runTests")?.addEventListener("click", runTestSuite);

$("#runHeroDemo")?.addEventListener("click", () => {
  $("#console-section")?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth"
  });

  /* The section does not need an ID lookup to work. */
  $(".console-section")?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start"
  });

  if (!testRunInProgress) {
    runTestSuite();
  }
});


/* =========================================
   PROJECT CASE FILE DATA
========================================= */

const projects = {
  web: {
    id: "PROJECT / 001",
    title: "Web Application Testing",
    summary:
      "A manual-testing project template focused on verifying common web application behavior and documenting reproducible issues.",

    scope: [
      "Review requirements and identify critical user journeys.",
      "Check forms, required fields, validation, and navigation.",
      "Explore positive, negative, and boundary-value scenarios.",
      "Record unexpected behavior with reproducible steps."
    ],

    scenarios: [
      "Submit a form with valid and invalid inputs.",
      "Test required fields using empty values.",
      "Try invalid formats and boundary-length values.",
      "Navigate between related pages and inspect state changes."
    ],

    deliverables: [
      "Test scenarios and test cases.",
      "Execution results with PASS / FAIL / BLOCKED statuses.",
      "Structured defect reports.",
      "A summary of findings and limitations."
    ],

    note:
      "Portfolio template. Add the tested application's name, actual execution evidence, and verified results before presenting this as a completed client project."
  },

  checkout: {
    id: "PROJECT / 002",
    title: "Checkout & Payment Scenarios",
    summary:
      "A test-design example for reviewing checkout rules, validation, and user-facing payment behavior without processing real payments.",

    scope: [
      "Review the agreed checkout requirements.",
      "Check mandatory fields and supported payment paths.",
      "Examine date and numeric-input validation.",
      "Verify error messages and recovery from invalid input."
    ],

    scenarios: [
      "Submit checkout with missing required information.",
      "Test numeric fields with too few, too many, and non-numeric characters.",
      "Check date boundaries and invalid date formats.",
      "Verify that a failed validation does not falsely confirm an order."
    ],

    deliverables: [
      "Requirement-to-test scenario mapping.",
      "Positive and negative test cases.",
      "Defect reports with expected versus actual results.",
      "Execution summary and open questions."
    ],

    note:
      "Template for a controlled test environment. Do not test live payment systems without explicit authorization and a safe testing arrangement."
  },

  regression: {
    id: "PROJECT / 003",
    title: "Regression Test Pack",
    summary:
      "A reusable approach for selecting critical application flows and checking whether changes affect previously working behavior.",

    scope: [
      "Identify business-critical user journeys.",
      "Select smoke tests for quick build verification.",
      "Prepare repeatable regression scenarios.",
      "Record results against a specific build or version."
    ],

    scenarios: [
      "Verify that the application loads and key pages are accessible.",
      "Check login, navigation, and core user actions.",
      "Retest defects after a fix is supplied.",
      "Recheck connected features that may be affected by a change."
    ],

    deliverables: [
      "Prioritized regression checklist.",
      "Repeatable test cases.",
      "Execution record and defect references.",
      "A summary of remaining risks and untested areas."
    ],

    note:
      "Template for a portfolio demonstration. Replace sample scenarios with the actual scope and results from your own work."
  }
};


/* =========================================
   PROJECT DETAILS DIALOG
========================================= */

const projectDialog = $("#projectDialog");
let lastDialogTrigger = null;

function populateList(element, items) {
  if (!element) return;

  element.replaceChildren();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function openProject(projectKey, trigger) {
  const project = projects[projectKey];

  if (!project || !projectDialog) return;

  lastDialogTrigger = trigger || document.activeElement;

  setText("dialogCaseId", project.id);
  setText("dialogTitle", project.title);
  setText("dialogSummary", project.summary);
  setText("dialogNote", project.note);

  populateList($("#dialogScope"), project.scope);
  populateList($("#dialogScenarios"), project.scenarios);
  populateList($("#dialogDeliverables"), project.deliverables);

  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
  } else {
    showToast("Your browser does not support the project dialog.");
  }
}

$$(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    openProject(card.dataset.project, card);
  });
});


/* =========================================
   CERTIFICATE VAULT DATA
========================================= */

/*
  Put certificate images inside:
  cert/

  Use exact file names in image.
  Leave image empty if you do not have a certificate image.

  Status values:
  earned   = completed and awarded
  progress = currently studying / preparing
  planned  = future goal
*/

const certificates = [
  {
    id: "CERT-001",
    title: "Web PenTest — Recon to Remediation",
    issuer: "Training / Course Certificate",
    status: "earned",
    statusLabel: "COMPLETED",
    date: "Add completion date",
    image: "cert/Web PenTeRecon to Remediation.jpg",
    verification: "",
    color: "#73eadc",
    description:
      "A web penetration-testing learning credential. Keep this entry only if the certificate has actually been awarded."
  },

  {
    id: "CERT-002",
    title: "Network Fundamentals",
    issuer: "Training / Course Certificate",
    status: "earned",
    statusLabel: "COMPLETED",
    date: "Add completion date",
    image: "cert/network fund.jpg",
    verification: "",
    color: "#a995ff",
    description:
      "A networking fundamentals learning credential. Add the real issuer and completion date."
  },

  {
    id: "CERT-003",
    title: "Network Implementation",
    issuer: "Training / Course Certificate",
    status: "earned",
    statusLabel: "COMPLETED",
    date: "Add completion date",
    image: "cert/implement of cs neteork.png",
    verification: "",
    color: "#ff6987",
    description:
      "A network implementation learning credential. Update the title and issuer to match the original certificate."
  },

  {
    id: "CERT-004",
    title: "eJPT v2",
    issuer: "INE",
    status: "progress",
    statusLabel: "IN PROGRESS",
    date: "Currently preparing",
    image: "",
    verification: "",
    color: "#ffd77b",
    description:
      "A current learning goal. Replace this record with the awarded credential and its verification link after passing the exam."
  },

  {
    id: "CERT-005",
    title: "OSCP+",
    issuer: "OffSec",
    status: "planned",
    statusLabel: "PLANNED",
    date: "Future goal",
    image: "",
    verification: "",
    color: "#a995ff",
    description:
      "A planned future certification. Keep it clearly labelled as planned until the credential is earned."
  }
];


/* =========================================
   RENDER CERTIFICATE CARDS
========================================= */

let activeCertificateFilter = "all";
const certificateGrid = $("#certificateGrid");

function createCertificateCard(certificate, index) {
  const card = document.createElement("button");

  card.type = "button";
  card.className = "certificate-card reveal";
  card.dataset.certificateId = certificate.id;
  card.dataset.status = certificate.status;
  card.style.setProperty("--cert-color", certificate.color);
  card.setAttribute("aria-haspopup", "dialog");

  const top = document.createElement("span");
  top.className = "certificate-top";

  const id = document.createElement("span");
  id.className = "certificate-id";
  id.textContent = certificate.id;

  const badge = document.createElement("span");
  badge.className = "certificate-badge";
  badge.setAttribute("aria-hidden", "true");
  badge.textContent = certificate.status === "earned"
    ? "✓"
    : certificate.status === "progress"
      ? "◷"
      : "◇";

  top.append(id, badge);

  const art = document.createElement("span");
  art.className = "certificate-art";

  if (certificate.image) {
    const image = document.createElement("img");

    image.src = certificate.image;
    image.alt = `${certificate.title} certificate preview`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.remove();

      const fallback = document.createElement("span");
      fallback.className = "certificate-monogram";
      fallback.textContent = "MS";

      const caption = document.createElement("small");
      caption.textContent = "ADD CERTIFICATE IMAGE";

      art.replaceChildren(fallback, caption);
    });

    art.appendChild(image);
  } else {
    const monogram = document.createElement("span");
    monogram.className = "certificate-monogram";
    monogram.textContent = certificate.status === "planned"
      ? "◇"
      : certificate.status === "progress"
        ? "↗"
        : "MS";

    const caption = document.createElement("small");
    caption.textContent = certificate.status === "earned"
      ? "CREDENTIAL RECORD"
      : certificate.status === "progress"
        ? "LEARNING IN PROGRESS"
        : "FUTURE LEARNING GOAL";

    art.append(monogram, caption);
  }

  const title = document.createElement("span");
  title.className = "certificate-title";
  const heading = document.createElement("span");
  heading.className = "visually-hidden";
  heading.textContent = certificate.title;
  title.appendChild(heading);

  const headingElement = document.createElement("span");
  headingElement.className = "certificate-heading";
  headingElement.textContent = certificate.title;

  const issuer = document.createElement("span");
  issuer.className = "certificate-issuer";
  issuer.textContent = certificate.issuer;

  const status = document.createElement("span");
  status.className = `certificate-status ${certificate.status}`;
  status.textContent = certificate.statusLabel;

  const date = document.createElement("span");
  date.className = "certificate-date";
  date.textContent = certificate.date;

  const footer = document.createElement("span");
  footer.className = "certificate-open";

  const footerLabel = document.createElement("span");
  footerLabel.textContent = certificate.image
    ? "OPEN CREDENTIAL"
    : "VIEW RECORD";

  const footerArrow = document.createElement("span");
  footerArrow.textContent = "↗";

  footer.append(footerLabel, footerArrow);

  card.append(
    top,
    art,
    headingElement,
    issuer,
    status,
    date,
    footer
  );

  card.addEventListener("click", () => {
    openCertificate(certificate, card);
  });

  return card;
}


/* Hidden utility class for accessible text */

const utilityStyle = document.createElement("style");
utilityStyle.textContent = `
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
document.head.appendChild(utilityStyle);


function renderCertificates() {
  if (!certificateGrid) return;

  certificateGrid.replaceChildren();

  const filtered = certificates.filter((certificate) => {
    return activeCertificateFilter === "all" ||
      certificate.status === activeCertificateFilter;
  });

  setText(
    "vaultCounter",
    `${filtered.length} RECORD${filtered.length === 1 ? "" : "S"}`
  );

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "vault-empty";
    empty.textContent = "NO CREDENTIALS IN THIS CATEGORY.";
    certificateGrid.appendChild(empty);
    return;
  }

  filtered.forEach((certificate, index) => {
    const card = createCertificateCard(certificate, index);
    certificateGrid.appendChild(card);

    if ("IntersectionObserver" in window && !reducedMotion) {
      revealCertificateObserver.observe(card);
    } else {
      card.classList.add("shown");
    }
  });
}


/* Certificate entrance observer */

const revealCertificateObserver =
  "IntersectionObserver" in window && !reducedMotion
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("shown");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1 })
    : {
        observe(element) {
          element.classList.add("shown");
        }
      };


/* Certificate filter tabs */

$$(".vault-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    activeCertificateFilter = tab.dataset.certFilter;

    $$(".vault-tab").forEach((item) => {
      const active = item === tab;

      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderCertificates();
  });
});


/* =========================================
   CERTIFICATE PREVIEW DIALOG
========================================= */

const certificateDialog = $("#certificateDialog");

function openCertificate(certificate, trigger) {
  if (!certificateDialog) return;

  lastDialogTrigger = trigger || document.activeElement;

  setText("certificateDialogTitle", certificate.title);
  setText(
    "certificateDialogMeta",
    `${certificate.issuer} · ${certificate.statusLabel} · ${certificate.date}`
  );
  setText("certificateDialogNote", certificate.description);

  const preview = $("#certificatePreview");
  const verify = $("#certificateVerify");

  if (preview) {
    preview.replaceChildren();

    if (certificate.image) {
      const image = document.createElement("img");
      image.src = certificate.image;
      image.alt = `${certificate.title} certificate`;

      image.addEventListener("error", () => {
        preview.replaceChildren();

        const placeholder = document.createElement("p");
        placeholder.className = "preview-placeholder";
        placeholder.textContent =
          "CERTIFICATE IMAGE NOT FOUND. CHECK THE IMAGE PATH IN script.js.";

        preview.appendChild(placeholder);
      });

      preview.appendChild(image);
    } else {
      const placeholder = document.createElement("p");
      placeholder.className = "preview-placeholder";

      placeholder.textContent =
        certificate.status === "progress"
          ? "IN PROGRESS — NO COMPLETED CERTIFICATE TO DISPLAY."
          : certificate.status === "planned"
            ? "PLANNED CREDENTIAL — NOT YET AWARDED."
            : "NO CERTIFICATE IMAGE HAS BEEN ADDED YET.";

      preview.appendChild(placeholder);
    }
  }

  if (verify) {
    const validVerification =
      typeof certificate.verification === "string" &&
      /^https:\/\//i.test(certificate.verification);

    verify.hidden = !validVerification;

    if (validVerification) {
      verify.href = certificate.verification;
    } else {
      verify.removeAttribute("href");
    }
  }

  if (typeof certificateDialog.showModal === "function") {
    certificateDialog.showModal();
  }
}


/* =========================================
   DIALOG CLOSE / BACKDROP
========================================= */

$$("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog")?.close();
  });
});

$$("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    if (lastDialogTrigger && document.contains(lastDialogTrigger)) {
      lastDialogTrigger.focus();
    }

    lastDialogTrigger = null;
  });
});


/* =========================================
   INITIALIZE
========================================= */

function initializePortfolio() {
  renderBugCase("login");
  resetTestConsole();
  renderCertificates();

  setText("year", `© ${new Date().getFullYear()}`);
}

initializePortfolio();
