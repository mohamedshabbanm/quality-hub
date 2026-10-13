/* ==========================================================
   Mohamed Shabban — Software Testing Portfolio
   Vanilla JavaScript. No dependencies, nothing is sent anywhere.
   ========================================================== */
   (function () {
    'use strict';
  
    document.documentElement.classList.add('js');
  
    /* ---------------- Utilities ---------------- */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const slug = (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const EMAIL = 'mohamedworkoff@gmail.com';
  
    let toastTimer;
    function toast(message, type) {
      const el = $('#toast');
      if (!el) return;
      el.textContent = message;
      el.className = 'toast show' + (type === 'error' ? ' toast--error' : '');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { el.className = 'toast'; }, 3200);
    }
  
    async function copyText(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (err) { /* fall through to legacy method */ }
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch (err) {
        return false;
      }
    }
  
    async function copyWithFeedback(text, button, successMessage) {
      const ok = await copyText(text);
      if (ok) {
        toast(successMessage);
        if (button) {
          const original = button.dataset.label || button.textContent;
          button.dataset.label = original;
          button.textContent = 'Copied ✓';
          setTimeout(() => { button.textContent = original; }, 1800);
        }
      } else {
        toast('Copy was blocked by your browser. Please select the text and copy it manually.', 'error');
      }
    }
  
    /* Accessible tabs: roving tabindex, arrow keys, Home/End */
    function makeTabs(tabs, onSelect) {
      function select(index, focus) {
        tabs.forEach((tab, i) => {
          const on = i === index;
          tab.setAttribute('aria-selected', String(on));
          tab.tabIndex = on ? 0 : -1;
        });
        onSelect(index);
        if (focus) tabs[index].focus();
      }
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(i));
        tab.addEventListener('keydown', (e) => {
          let next = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = tabs.length - 1;
          if (next !== null) { e.preventDefault(); select(next, true); }
        });
      });
      return select;
    }
  
    function statusPill(status) {
      const icons = { 'Pass': '✓', 'Fail': '✕', 'Blocked': '⏸', 'Not Run': '○', 'Running': '…' };
      return `<span class="pill pill--${slug(status)}"><span aria-hidden="true">${icons[status] || ''}</span> ${esc(status)}</span>`;
    }
  
    /* ---------------- Data ---------------- */
  
    const stages = [
      { label: 'Requirement', title: 'Understand what should happen',
        text: 'Every test starts with expected behavior. I read the requirement, note anything unclear, and list what must be true for the feature to work.',
        artifact: ['REQ-DEMO-04', 'The password field must accept 8–64 characters.', 'Open question: are spaces allowed?'] },
      { label: 'Test Case', title: 'Turn the requirement into checks',
        text: 'Positive, negative and boundary scenarios become clear, reusable test cases with preconditions, steps and expected results.',
        artifact: ['TC-DEMO-12 · Password length boundary', 'Pre: sign-up page is open', 'Steps: enter 7, 8, 64 and 65 characters', 'Expected: 7 and 65 rejected; 8 and 64 accepted'] },
      { label: 'Execution', title: 'Run the test and record what happened',
        text: 'Actual results are written next to the expected ones, with evidence such as screenshots, so any difference is easy to see.',
        artifact: ['Run: TC-DEMO-12', '8 characters → accepted (expected: accepted)', '65 characters → accepted (expected: rejected)', 'Status: Fail'] },
      { label: 'Defect Report', title: 'Describe the problem so it can be reproduced',
        text: 'A good defect report has a precise title, steps, expected and actual results, environment, severity and priority.',
        artifact: ['DEMO-BUG-104 · 65-character password accepted', 'Severity: Minor · Priority: Medium', 'Steps: 1. Open sign-up 2. Enter 65 characters 3. Submit', 'Expected: validation message · Actual: account created'] },
      { label: 'Verification', title: 'Retest the fix and check for side effects',
        text: 'After a fix, I rerun the failed test and a focused set of regression checks around the changed area.',
        artifact: ['Retest: TC-DEMO-12 on the fixed build', 'Regression: sign-up, sign-in, password reset', 'Result: Pass → defect can be closed'] }
    ];
  
    const L = { P: 'Practicing', L: 'Learning', W: 'Working knowledge' };
    const skillData = [
      { id: 'manual', label: 'Manual Testing', blurb: 'Hands-on checking of features against requirements, from happy paths to unusual input.', items: [
        ['Functional Testing', L.P, 'Checking that each feature behaves as the requirement describes.'],
        ['Regression Testing', L.P, 'Re-running relevant checks after a fix or change to catch side effects.'],
        ['Smoke and Sanity Testing', L.L, 'Quick build checks versus focused checks after a small change.'],
        ['Exploratory Testing', L.L, 'Investigating without a script while noting what I tried and what I saw.'],
        ['Negative Testing', L.P, 'Using invalid, missing or unexpected input to see how the system responds.'],
        ['UI Testing', L.P, 'Labels, layout, states and responsive behavior.'],
        ['Cross-Browser Testing', L.W, 'Comparing behavior across browsers with manual checks and DevTools.'],
        ['Requirements-Based Testing', L.P, 'Tracing test cases back to the stated requirement.']
      ] },
      { id: 'design', label: 'Test Design', blurb: 'Choosing a small set of meaningful tests instead of trying everything.', items: [
        ['Test Scenario Design', L.P, 'Listing what should be tested before writing detailed cases.'],
        ['Test Case Design and Execution', L.P, 'Writing clear, reusable cases and recording actual results.'],
        ['Equivalence Partitioning', L.P, 'Grouping inputs that should behave the same and testing one from each group.'],
        ['Boundary Value Analysis', L.P, 'Testing values at and around the edges of valid ranges.'],
        ['Decision Table Testing', L.L, 'Covering combinations of conditions and their expected outcomes.'],
        ['State Transition Testing', L.L, 'Checking how a system moves between states, such as order statuses.']
      ] },
      { id: 'api', label: 'API Testing', blurb: 'Validating requests and responses with Postman.', items: [
        ['API Testing with Postman', L.P, 'Building requests, collections and environments.'],
        ['HTTP Methods', L.P, 'GET, POST, PUT, PATCH and DELETE, and what each should do.'],
        ['HTTP Status Codes', L.P, 'Checking that 2xx, 4xx and 5xx codes match the scenario.'],
        ['Request and Response Validation', L.P, 'Comparing what was sent and received with the specification.'],
        ['Headers, Parameters and Bodies', L.P, 'Setting and varying each part of a request.'],
        ['JSON Response Validation', L.P, 'Checking fields, types and required values.'],
        ['Positive and Negative API Scenarios', L.P, 'Valid calls plus missing, malformed and unknown inputs.'],
        ['Basic API Test Assertions', L.L, 'Writing simple Postman tests for status and body.']
      ] },
      { id: 'database', label: 'Database Testing', blurb: 'Confirming that what the application shows matches what is stored.', items: [
        ['SQL Fundamentals', L.L, 'SELECT, WHERE, JOIN, GROUP BY and ORDER BY.'],
        ['Basic SQL Queries', L.P, 'Writing queries to look up records for verification.'],
        ['CRUD Operations', L.W, 'Understanding create, read, update and delete behavior.'],
        ['Data Validation', L.P, 'Checking values, formats and required fields in stored data.'],
        ['Database Integrity Checks', L.L, 'Looking for orphan records and mismatched totals.'],
        ['Application Data vs Database Results', L.P, 'Comparing UI values with query results.']
      ] },
      { id: 'bugs', label: 'Bug Reporting', blurb: 'Writing defect reports that another person can reproduce and act on.', items: [
        ['Clear Titles and Descriptions', L.P, 'Short titles that state the problem and where it happens.'],
        ['Preconditions and Reproduction Steps', L.P, 'Numbered steps that start from a known state.'],
        ['Expected vs Actual Results', L.P, 'Stating the difference without opinion.'],
        ['Severity and Priority Concepts', L.W, 'Separating the impact of a defect from the urgency of fixing it.'],
        ['Evidence and Screenshots', L.P, 'Attaching proof that shows the problem clearly.'],
        ['Jira-Style Defect Reporting', L.P, 'Using fields such as environment, status and linked test cases.'],
        ['Test Execution Results', L.P, 'Recording Pass, Fail, Blocked and Not Run with notes.']
      ] },
      { id: 'fundamentals', label: 'Testing Fundamentals', blurb: 'The concepts behind the techniques, including ISTQB Foundation Level syllabus topics I am studying.', items: [
        ['Software Testing Life Cycle (STLC)', L.L, 'Planning, design, execution and closure of testing activities.'],
        ['Software Development Life Cycle (SDLC)', L.L, 'Where testing fits in different development approaches.'],
        ['Test Levels and Test Types', L.L, 'Unit, integration, system and acceptance; functional and non-functional.'],
        ['Static Testing Fundamentals', L.L, 'Reviewing requirements and documents before running code.'],
        ['Defect Lifecycle', L.W, 'How a defect moves from new to closed.'],
        ['Test Planning and Reporting', L.L, 'Scope, approach and clear summaries of results.'],
        ['ISTQB Foundation Level Syllabus', L.L, 'Studying the concepts. I do not hold the certification.']
      ] },
      { id: 'tools', label: 'Tools', blurb: 'Tools I use for testing and documentation.', items: [
        ['Jira', L.L, 'Defect tracking and workflow concepts.'],
        ['Postman', L.P, 'Sending requests and validating responses.'],
        ['Git and GitHub', L.W, 'Version control and sharing project files.'],
        ['Browser Developer Tools', L.P, 'Inspecting elements, network calls and console messages.'],
        ['Excel / Google Sheets', L.P, 'Test case tables and execution tracking.']
      ] }
    ];
  
    /* Master list of illustrative test cases (used by projects and the table) */
    const testCases = [
      { id: 'TC-AUTH-001', title: 'Sign in with valid credentials', category: 'Authentication', priority: 'High', status: 'Pass',
        pre: 'A registered demo account exists and the sign-in page is open.',
        steps: ['Enter the registered email address.', 'Enter the matching password.', 'Select Sign in.'],
        expected: 'The user reaches the account page and a welcome message is shown.',
        actual: 'Account page displayed with the welcome message.' },
      { id: 'TC-AUTH-002', title: 'Submit the form with required fields empty', category: 'Authentication', priority: 'High', status: 'Pass',
        pre: 'The sign-in page is open and both fields are empty.',
        steps: ['Leave email and password empty.', 'Select Sign in.'],
        expected: 'Inline messages mark both fields as required and no sign-in attempt is made.',
        actual: 'Both fields showed required-field messages.' },
      { id: 'TC-AUTH-003', title: 'Enter a malformed email address', category: 'Authentication', priority: 'Medium', status: 'Fail',
        pre: 'The sign-in page is open.',
        steps: ['Enter "user@@example" in the email field.', 'Enter any password.', 'Select Sign in.'],
        expected: 'An inline message asks for a valid email address.',
        actual: 'A generic "Login failed" banner appeared and the email field was not marked invalid. See DEMO-BUG-001.' },
      { id: 'TC-AUTH-004', title: 'Sign in with an incorrect password', category: 'Authentication', priority: 'High', status: 'Pass',
        pre: 'A registered demo account exists and the sign-in page is open.',
        steps: ['Enter the registered email address.', 'Enter a wrong password.', 'Select Sign in.'],
        expected: 'A generic "Incorrect email or password" message appears without revealing which value was wrong.',
        actual: 'Generic message displayed.' },
      { id: 'TC-AUTH-005', title: 'Request a password reset link', category: 'Authentication', priority: 'Medium', status: 'Blocked',
        pre: 'The sign-in page is open and the reset email service is available.',
        steps: ['Select "Forgot password".', 'Enter a registered email address.', 'Submit the request.'],
        expected: 'A confirmation message is shown and a reset email is sent.',
        actual: 'Blocked: the reset email service was not available in the sample environment.' },
  
      { id: 'TC-CART-001', title: 'Add a product to the cart', category: 'Cart & Checkout', priority: 'High', status: 'Pass',
        pre: 'A product page is open and the cart is empty.',
        steps: ['Select quantity 1.', 'Select Add to cart.', 'Open the cart.'],
        expected: 'The cart lists the product with quantity 1 and the correct price.',
        actual: 'Product, quantity and price matched.' },
      { id: 'TC-CART-002', title: 'Update item quantity', category: 'Cart & Checkout', priority: 'High', status: 'Fail',
        pre: 'The cart contains one product with quantity 1.',
        steps: ['Open the cart.', 'Change the quantity from 1 to 3.', 'Select Update cart.'],
        expected: 'The line total and order total are recalculated for quantity 3.',
        actual: 'Quantity showed 3 but the order total stayed at the quantity-1 amount. See DEMO-BUG-002.' },
      { id: 'TC-CART-003', title: 'Reject a quantity of zero', category: 'Cart & Checkout', priority: 'Medium', status: 'Pass',
        pre: 'The cart contains one product.',
        steps: ['Open the cart.', 'Enter 0 as the quantity.', 'Select Update cart.'],
        expected: 'A message explains that the minimum quantity is 1 and the cart is unchanged.',
        actual: 'Message displayed and cart unchanged.' },
      { id: 'TC-CART-004', title: 'Apply an expired coupon code', category: 'Cart & Checkout', priority: 'Low', status: 'Blocked',
        pre: 'The cart contains at least one product.',
        steps: ['Enter an expired coupon code.', 'Select Apply.'],
        expected: 'An "expired coupon" message is shown and the total does not change.',
        actual: 'Blocked: no expired coupon was available in the sample test data.' },
  
      { id: 'TC-API-001', title: 'GET an existing product', category: 'API', priority: 'High', status: 'Pass',
        pre: 'The Postman environment has the base URL variable set.',
        steps: ['Send GET {{baseUrl}}/products/101.', 'Check the status code.', 'Check the JSON body fields.'],
        expected: 'Status 200 and a JSON body containing id and name.',
        actual: 'Status 200 with id and name returned.' },
      { id: 'TC-API-002', title: 'POST a product with a required field missing', category: 'API', priority: 'High', status: 'Fail',
        pre: 'Valid request headers are prepared.',
        steps: ['Send POST {{baseUrl}}/products with a body that has no "name" field.', 'Check the status code.', 'Check the error message in the response.'],
        expected: 'Status 400 with a message naming the missing field.',
        actual: 'Status 200 and a new record was returned. See DEMO-BUG-003.' },
      { id: 'TC-API-003', title: 'GET a product that does not exist', category: 'API', priority: 'Medium', status: 'Pass',
        pre: 'The Postman environment has the base URL variable set.',
        steps: ['Send GET {{baseUrl}}/products/999999.', 'Check the status code.', 'Check the error body.'],
        expected: 'Status 404 with a "not found" message.',
        actual: 'Status 404 returned with a message.' },
  
      { id: 'TC-DB-001', title: 'Order total matches the database record', category: 'Database', priority: 'High', status: 'Pass',
        pre: 'Order 1001 was placed through the application.',
        steps: ['Note the total on the order confirmation page.', 'Query the orders table for order 1001.', 'Compare total_amount with the displayed total.'],
        expected: 'Both values are identical.',
        actual: 'Values matched.' },
      { id: 'TC-DB-002', title: 'Order item count matches the order', category: 'Database', priority: 'Medium', status: 'Pass',
        pre: 'Order 1001 was placed with several items.',
        steps: ['Count the items on the confirmation page.', 'Run COUNT(*) on order_items for order 1001.', 'Compare the two counts.'],
        expected: 'The counts are equal.',
        actual: 'Counts matched.' },
      { id: 'TC-DB-003', title: 'No orphaned order items exist', category: 'Database', priority: 'Medium', status: 'Not Run',
        pre: 'Read access to the sample database.',
        steps: ['Run a LEFT JOIN from order_items to orders.', 'Filter for rows without a parent order.'],
        expected: 'The query returns zero rows.',
        actual: 'Not executed yet.' },
  
      { id: 'TC-BVA-001', title: 'Age field lower boundary (valid range 18–60)', category: 'Test Design', priority: 'High', status: 'Not Run',
        pre: 'The registration form is open.',
        steps: ['Enter 17 and submit.', 'Enter 18 and submit.', 'Enter 19 and submit.'],
        expected: '17 is rejected; 18 and 19 are accepted.',
        actual: 'Design exercise, not executed.' },
      { id: 'TC-BVA-002', title: 'Age field upper boundary (valid range 18–60)', category: 'Test Design', priority: 'High', status: 'Not Run',
        pre: 'The registration form is open.',
        steps: ['Enter 59 and submit.', 'Enter 60 and submit.', 'Enter 61 and submit.'],
        expected: '59 and 60 are accepted; 61 is rejected.',
        actual: 'Design exercise, not executed.' },
      { id: 'TC-EP-001', title: 'Age field equivalence partitions', category: 'Test Design', priority: 'Medium', status: 'Not Run',
        pre: 'The registration form is open.',
        steps: ['Enter 10 (invalid, below range).', 'Enter 35 (valid).', 'Enter 75 (invalid, above range).'],
        expected: '10 and 75 are rejected; 35 is accepted.',
        actual: 'Design exercise, not executed.' }
    ];
    const tcById = {};
    testCases.forEach((tc) => { tcById[tc.id] = tc; });
  
    const projects = [
      { title: 'Login and Authentication Functional Testing', types: ['Functional', 'Negative'],
        app: 'DemoShop, a fictional online store sign-in page.',
        objective: 'Check that sign-in accepts valid credentials, rejects invalid input with clear messages, and does not reveal which value was wrong.',
        scope: 'In scope: email and password validation, error messages, successful sign-in. Out of scope: performance, third-party sign-in, security testing.',
        scenarios: ['Valid sign-in', 'Required fields left empty', 'Malformed email address', 'Incorrect password', 'Password reset request'],
        cases: ['TC-AUTH-001', 'TC-AUTH-003', 'TC-AUTH-004'],
        defects: 'Illustrative sample defect: DEMO-BUG-001, missing inline message for a malformed email (see the Bug Report Showcase).',
        lessons: 'Field-level messages are easy to miss when a generic banner exists. Checking each invalid input separately exposes the gap.' },
      { title: 'E-Commerce Cart and Checkout Testing', types: ['Functional'],
        app: 'DemoShop, a fictional cart and checkout flow.',
        objective: 'Verify that adding items, changing quantities and applying coupons update the cart and totals correctly.',
        scope: 'In scope: add to cart, quantity changes, totals, coupon messages. Out of scope: payment gateway, shipping providers.',
        scenarios: ['Add a single item', 'Change item quantity', 'Quantity of zero or negative', 'Expired coupon', 'Remove item'],
        cases: ['TC-CART-001', 'TC-CART-002', 'TC-CART-004'],
        defects: 'Illustrative sample defect: DEMO-BUG-002, order total not updated after a quantity change.',
        lessons: 'Calculated values need an independent expected result worked out before execution. A blocked test still needs a note on what test data it requires.' },
      { title: 'API Testing with Postman', types: ['API', 'Negative'],
        app: 'A fictional product catalog REST API, described as practice scenarios.',
        objective: 'Validate status codes and JSON responses for valid, missing and unknown inputs.',
        scope: 'In scope: GET and POST requests, status codes, response bodies. Out of scope: authentication, load and performance.',
        scenarios: ['Retrieve an existing product', 'Create a product with a missing required field', 'Request a product that does not exist'],
        cases: ['TC-API-001', 'TC-API-002', 'TC-API-003'],
        snippetLabel: 'Example Postman assertions (Tests tab)',
        snippet: 'pm.test("Status code is 200", function () {\n  pm.response.to.have.status(200);\n});\n\npm.test("Response has id and name", function () {\n  const body = pm.response.json();\n  pm.expect(body).to.have.property("id");\n  pm.expect(body).to.have.property("name");\n});',
        defects: 'Illustrative sample defect: DEMO-BUG-003, a request with a missing required field returns 200.',
        lessons: 'Negative API cases catch more than happy paths. Checking the error message as well as the status code makes failures easier to understand.' },
      { title: 'Database Validation with SQL', types: ['Database'],
        app: 'A fictional orders database behind the DemoShop application.',
        objective: 'Confirm that order data shown in the application matches the stored records.',
        scope: 'In scope: orders and order_items tables, totals, counts, orphan records. Out of scope: performance tuning and schema design.',
        scenarios: ['Order total matches the stored total', 'Item count matches', 'No order items without a parent order'],
        cases: ['TC-DB-001', 'TC-DB-002', 'TC-DB-003'],
        snippetLabel: 'Example validation queries',
        snippet: '-- 1. Stored total for the order\nSELECT order_id, customer_id, total_amount, status\nFROM orders\nWHERE order_id = 1001;\n\n-- 2. Item count for the order\nSELECT COUNT(*) AS item_count\nFROM order_items\nWHERE order_id = 1001;\n\n-- 3. Orphaned items (expected: zero rows)\nSELECT oi.item_id\nFROM order_items oi\nLEFT JOIN orders o ON o.order_id = oi.order_id\nWHERE o.order_id IS NULL;',
        defects: 'None recorded in this illustrative exercise.',
        lessons: 'Comparing the interface with the database catches problems that look correct on screen. Queries should be saved with the test case so they can be rerun.' },
      { title: 'Test Case Design with Equivalence Partitioning and Boundary Value Analysis', types: ['Test Design'],
        app: 'A fictional registration form with an age field that accepts 18–60.',
        objective: 'Show how partitions and boundary values reduce many possible inputs to a small, meaningful set.',
        scope: 'In scope: the age field only. This is a test design exercise, so no application was executed.',
        scenarios: ['Value below the valid range', 'Lower boundary values', 'Value inside the range', 'Upper boundary values', 'Value above the valid range'],
        cases: ['TC-BVA-001', 'TC-BVA-002', 'TC-EP-001'],
        snippetLabel: 'Partitions and boundary values',
        snippet: 'Rule: age must be 18–60 (inclusive)\n\nPartition   Range     Valid?   Representative\nBelow       < 18      No       10\nInside      18–60     Yes      35\nAbove       > 60      No       75\n\nBoundary values: 17, 18, 19  |  59, 60, 61',
        defects: 'Not applicable (design exercise).',
        lessons: 'Writing the partitions first makes gaps obvious. Boundary values are where off-by-one mistakes tend to hide.' }
    ];
  
    const bugReports = [
      { id: 'DEMO-BUG-001', title: 'No inline message when a malformed email is entered on sign-in',
        env: 'DemoShop (fictional) · Chrome, latest · Windows 11 · Staging build (illustrative)',
        pre: 'A registered demo account exists. The sign-in page is open.',
        steps: ['Open the sign-in page.', 'Enter "user@@example" in the Email field.', 'Enter any value in the Password field.', 'Select Sign in.'],
        expected: 'An inline message under the Email field says "Enter a valid email address" and the field is marked invalid.',
        actual: 'A generic "Login failed" banner appears at the top of the form. The Email field is not marked invalid and no field-level message is shown.',
        severity: 'Minor', priority: 'Medium', status: 'Open',
        evidence: '[Screenshot placeholder: sign-in page showing the generic banner]',
        regression: ['TC-AUTH-002: required fields empty', 'Email with leading or trailing spaces', 'Email without a domain extension', 'Screen reader announces the error message'] },
      { id: 'DEMO-BUG-002', title: 'Order total is not updated after changing item quantity in the cart',
        env: 'DemoShop (fictional) · Firefox, latest · Windows 11 · Staging build (illustrative)',
        pre: 'The cart contains one product with quantity 1 and a unit price of 20.00.',
        steps: ['Open the cart.', 'Change the quantity from 1 to 3.', 'Select Update cart.', 'Read the line total and order total.'],
        expected: 'The line total and order total show 60.00.',
        actual: 'The quantity shows 3 but the order total remains 20.00 until the page is refreshed.',
        severity: 'Major', priority: 'High', status: 'Ready for retest',
        evidence: '[Screenshot placeholder: cart with quantity 3 and an unchanged total]',
        regression: ['TC-CART-001: add item to cart', 'TC-CART-003: quantity of zero', 'Remove an item and check the total', 'Apply a valid coupon after a quantity change'] },
      { id: 'DEMO-BUG-003', title: 'POST /products returns 200 when the required "name" field is missing',
        env: 'Fictional product catalog API · Postman desktop · Test environment (illustrative)',
        pre: 'The Postman environment defines baseUrl. Request header Content-Type is application/json.',
        steps: ['Create a POST request to {{baseUrl}}/products.', 'Send a JSON body with "price" but without "name".', 'Send the request.', 'Check the status code and response body.'],
        expected: 'Status 400 with a message that "name" is required. No record is created.',
        actual: 'Status 200. The response contains a new product with a null name.',
        severity: 'Major', priority: 'High', status: 'Open',
        evidence: '[Screenshot placeholder: Postman response showing status 200]',
        regression: ['TC-API-001: GET existing product', 'POST with an empty "name" string', 'POST with a wrong data type for "price"', 'Confirm no record was created in the database'] }
    ];
  
    /* ---------------- Navigation ---------------- */
    const header = $('.site-header');
    const menuToggle = $('#menuToggle');
    const siteNav = $('#siteNav');
  
    function setMenu(open) {
      header.classList.toggle('nav-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
    siteNav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  
    // Active section indicator
    const navLinks = $$('.site-nav ul a');
    const sectionMap = new Map();
    navLinks.forEach((a) => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) sectionMap.set(target, a);
    });
    if ('IntersectionObserver' in window) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.removeAttribute('aria-current'));
            sectionMap.get(entry.target).setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sectionMap.forEach((_, section) => navObserver.observe(section));
    }
  
    // Back to top
    const toTop = $('#toTop');
    window.addEventListener('scroll', () => { toTop.hidden = window.scrollY < 700; }, { passive: true });
    toTop.addEventListener('click', () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  
    /* ---------------- Hero: quality pipeline ---------------- */
    (function initPipeline() {
      const list = $('#stageTabs');
      const panel = $('#stagePanel');
      list.innerHTML = stages.map((s, i) =>
        `<button class="stage-tab" role="tab" type="button" id="stage-tab-${i}" aria-selected="false" aria-controls="stagePanel" tabindex="-1">` +
        `<span class="stage-num" aria-hidden="true">${i + 1}</span><span class="stage-label">${esc(s.label)}</span></button>`
      ).join('');
      const tabs = $$('.stage-tab', list);
      const select = makeTabs(tabs, (i) => {
        const s = stages[i];
        list.style.setProperty('--p', String(i / (stages.length - 1)));
        tabs.forEach((t, j) => t.classList.toggle('is-done', j < i));
        panel.setAttribute('aria-labelledby', `stage-tab-${i}`);
        panel.innerHTML =
          `<h3 class="stage-title">${esc(s.title)}</h3><p>${esc(s.text)}</p>` +
          `<div class="artifact"><span class="artifact-label">Illustrative sample</span><ul>${s.artifact.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></div>`;
        panel.classList.remove('swap');
        void panel.offsetWidth;
        panel.classList.add('swap');
      });
      select(0);
    })();
  
    /* ---------------- Skills explorer ---------------- */
    const selectSkill = (function initSkills() {
      const list = $('#skillTabs');
      const panel = $('#skillPanel');
      list.innerHTML = skillData.map((c, i) =>
        `<button class="skill-tab" role="tab" type="button" id="skill-tab-${c.id}" aria-selected="false" aria-controls="skillPanel" tabindex="-1">${esc(c.label)}</button>`
      ).join('');
      const tabs = $$('.skill-tab', list);
      const select = makeTabs(tabs, (i) => {
        const c = skillData[i];
        panel.setAttribute('aria-labelledby', `skill-tab-${c.id}`);
        panel.innerHTML =
          `<h3>${esc(c.label)}</h3><p class="panel-lead">${esc(c.blurb)}</p><ul class="skill-items">` +
          c.items.map(([name, level, desc]) =>
            `<li><div class="skill-top"><span class="skill-name">${esc(name)}</span><span class="level level--${slug(level)}">${esc(level)}</span></div><p>${esc(desc)}</p></li>`
          ).join('') + '</ul>';
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = '';
      });
      select(0);
      return (id) => {
        const idx = skillData.findIndex((c) => c.id === id);
        if (idx >= 0) select(idx);
      };
    })();
  
    // Links elsewhere on the page that point to a skill category
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-skill]');
      if (link) selectSkill(link.dataset.skill);
    });
  
    /* ---------------- Training months ---------------- */
    (function initMonths() {
      const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      $('#timelineMonths').innerHTML = months.map((m, i) => {
        const current = now.getFullYear() === 2026 && now.getMonth() === i + 6;
        return `<li${current ? ' class="is-current"' : ''}>${m}${current ? '<span class="sr-only"> (current month)</span>' : ''}</li>`;
      }).join('');
    })();
  
    /* ---------------- Projects ---------------- */
    function caseBlock(tc) {
      return `<article class="case"><header><span class="case-id">${esc(tc.id)}</span><h5>${esc(tc.title)}</h5>${statusPill(tc.status)}</header>` +
        `<dl><div><dt>Preconditions</dt><dd>${esc(tc.pre)}</dd></div>` +
        `<div><dt>Execution steps</dt><dd><ol>${tc.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></dd></div>` +
        `<div><dt>Expected result</dt><dd>${esc(tc.expected)}</dd></div>` +
        `<div><dt>Actual result (illustrative)</dt><dd>${esc(tc.actual)}</dd></div></dl></article>`;
    }
  
    function projectStatus(p) {
      const counts = {};
      p.cases.forEach((id) => { const s = tcById[id].status; counts[s] = (counts[s] || 0) + 1; });
      return 'Illustrative sample results: ' + Object.keys(counts).map((k) => `${counts[k]} ${k}`).join(' · ');
    }
  
    (function initProjects() {
      const filterBar = $('#projectFilters');
      const listEl = $('#projectList');
      const countEl = $('#projectCount');
      const types = ['All'].concat(Array.from(new Set(projects.flatMap((p) => p.types))));
      filterBar.innerHTML = types.map((t, i) => `<button class="chip" type="button" data-filter="${esc(t)}" aria-pressed="${i === 0}">${esc(t)}</button>`).join('');
  
      listEl.innerHTML = projects.map((p, i) => {
        const n = String(i + 1).padStart(2, '0');
        return `<li class="project" data-types="${esc(p.types.join('|'))}">` +
          `<div class="project-main"><span class="project-num" aria-hidden="true">${n}</span>` +
          `<div><h3>${esc(p.title)}</h3><p class="project-app">${esc(p.app)}</p>` +
          `<ul class="tags">${p.types.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}<li class="tag tag--quiet">Illustrative</li></ul></div>` +
          `<button class="btn btn-ghost btn-sm project-toggle" type="button" aria-expanded="false" aria-controls="project-details-${i}">View case study</button></div>` +
          `<div class="project-details" id="project-details-${i}" hidden>` +
          `<p class="illustrative-banner">Practice case study on a fictional application. Data and results are illustrative, not from a real project.</p>` +
          `<dl class="facts">` +
          `<div class="wide"><dt>Testing objective</dt><dd>${esc(p.objective)}</dd></div>` +
          `<div class="wide"><dt>Scope</dt><dd>${esc(p.scope)}</dd></div>` +
          `<div><dt>Status</dt><dd>${esc(projectStatus(p))}</dd></div>` +
          `<div><dt>Defects found</dt><dd>${esc(p.defects)}</dd></div></dl>` +
          `<div class="detail-block"><h4>Test scenarios</h4><ul class="bullets">${p.scenarios.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>` +
          (p.snippet ? `<div class="detail-block"><p class="snippet-label">${esc(p.snippetLabel)}</p><pre class="snippet"><code>${esc(p.snippet)}</code></pre></div>` : '') +
          `<div class="detail-block"><h4>Test cases</h4><div class="case-list">${p.cases.map((id) => caseBlock(tcById[id])).join('')}</div></div>` +
          `<div class="detail-block"><h4>Lessons learned</h4><p>${esc(p.lessons)}</p></div>` +
          `</div></li>`;
      }).join('');
  
      listEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.project-toggle');
        if (!btn) return;
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        btn.textContent = open ? 'View case study' : 'Hide case study';
        document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
      });
  
      filterBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        $$('.chip', filterBar).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        const f = chip.dataset.filter;
        let shown = 0;
        $$('.project', listEl).forEach((li) => {
          const match = f === 'All' || li.dataset.types.split('|').includes(f);
          li.hidden = !match;
          if (match) shown += 1;
        });
        countEl.textContent = `Showing ${shown} case ${shown === 1 ? 'study' : 'studies'}${f === 'All' ? '' : ' for ' + f}.`;
      });
    })();
  
    /* ---------------- Test Lab: demo app ---------------- */
    const DEMO = { email: 'demo@example.test', password: 'Demo#2026' };
  
    // The fictional "application under test"
    function demoApp(email, password, seeded) {
      const e = (email || '').trim();
      const errors = {};
      const emailRe = seeded ? /^[^\s@]+@[^\s@]+$/ : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!e) errors.email = 'Email is required.';
      else if (!emailRe.test(e)) errors.email = 'Enter a valid email address.';
      if (!password) errors.password = 'Password is required.';
      if (Object.keys(errors).length) return { ok: false, errors };
      if (e.toLowerCase() === DEMO.email && password === DEMO.password) {
        return { ok: true, message: 'Signed in (simulated). Welcome back, Demo User.' };
      }
      return { ok: false, errors: {}, banner: 'Incorrect email or password.' };
    }
    function describeResult(r) {
      if (r.ok) return r.message;
      const parts = Object.values(r.errors || {});
      return parts.length ? parts.join(' ') : r.banner;
    }
  
    (function initDemoForm() {
      const form = $('#demoForm');
      const email = $('#demoEmail');
      const pw = $('#demoPassword');
      const emailErr = $('#demoEmailErr');
      const pwErr = $('#demoPasswordErr');
      const result = $('#demoResult');
      const seed = $('#seedDefect');
  
      function setError(input, errEl, message) {
        if (message) {
          errEl.textContent = message;
          errEl.hidden = false;
          input.setAttribute('aria-invalid', 'true');
        } else {
          errEl.textContent = '';
          errEl.hidden = true;
          input.removeAttribute('aria-invalid');
        }
      }
      function clearFeedback() {
        setError(email, emailErr, '');
        setError(pw, pwErr, '');
        result.innerHTML = '';
      }
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFeedback();
        const r = demoApp(email.value, pw.value, seed.checked);
        if (r.ok) {
          result.innerHTML = `<p class="msg msg--ok">${esc(r.message)}</p>`;
          return;
        }
        setError(email, emailErr, r.errors.email);
        setError(pw, pwErr, r.errors.password);
        if (r.banner) result.innerHTML = `<p class="msg msg--error">${esc(r.banner)}</p>`;
        if (r.errors.email) email.focus();
        else if (r.errors.password) pw.focus();
      });
  
      const fills = {
        valid: [DEMO.email, DEMO.password],
        empty: ['', ''],
        badEmail: ['user@@example.test', 'Demo#2026'],
        noDomain: ['user@domain', 'Demo#2026'],
        wrongPw: [DEMO.email, 'not-the-password'],
        clear: ['', '']
      };
      $$('[data-fill]').forEach((btn) => btn.addEventListener('click', () => {
        const v = fills[btn.dataset.fill];
        email.value = v[0];
        pw.value = v[1];
        clearFeedback();
        email.focus();
      }));
    })();
  
    /* ---------------- Test Lab: simulated test run ---------------- */
    (function initRunner() {
      const runCases = [
        { id: 'LG-01', title: 'Valid credentials sign in', input: [DEMO.email, DEMO.password], check: (r) => r.ok === true },
        { id: 'LG-02', title: 'Empty email shows "Email is required."', input: ['', DEMO.password], check: (r) => !r.ok && r.errors.email === 'Email is required.' },
        { id: 'LG-03', title: 'Empty password shows "Password is required."', input: [DEMO.email, ''], check: (r) => !r.ok && r.errors.password === 'Password is required.' },
        { id: 'LG-04', title: 'Both fields empty show both messages', input: ['', ''], check: (r) => !r.ok && !!r.errors.email && !!r.errors.password },
        { id: 'LG-05', title: 'Malformed email "user@@example.test" is rejected', input: ['user@@example.test', DEMO.password], check: (r) => !r.ok && r.errors.email === 'Enter a valid email address.' },
        { id: 'LG-06', title: 'Email without a domain extension is rejected', input: ['user@domain', DEMO.password], check: (r) => !r.ok && r.errors.email === 'Enter a valid email address.' },
        { id: 'LG-07', title: 'Wrong password shows a generic error', input: [DEMO.email, 'wrong-password'], check: (r) => !r.ok && r.banner === 'Incorrect email or password.' },
        { id: 'LG-08', title: 'Request a password reset link', blocked: 'Blocked: the demo has no reset email service.' }
      ];
  
      const body = $('#runBody');
      const summary = $('#runSummary');
      const runBtn = $('#runTests');
      const resetBtn = $('#resetTests');
      const seed = $('#seedDefect');
      let runToken = 0;
      const state = runCases.map(() => ({ status: 'Not Run', note: '' }));
  
      function render() {
        body.innerHTML = runCases.map((c, i) =>
          `<tr><td>${c.id}</td><td>${esc(c.title)}${state[i].note ? `<span class="run-note">${esc(state[i].note)}</span>` : ''}</td><td>${statusPill(state[i].status)}</td></tr>`
        ).join('');
      }
      function totals() {
        const t = { Pass: 0, Fail: 0, Blocked: 0, 'Not Run': 0 };
        state.forEach((s) => { if (t[s.status] !== undefined) t[s.status] += 1; });
        return t;
      }
      function reset(message) {
        runToken += 1;
        state.forEach((s) => { s.status = 'Not Run'; s.note = ''; });
        runBtn.disabled = false;
        summary.textContent = message || 'Not run yet. Run the suite, then tick the seeded-defect box and run it again to see a case fail.';
        render();
      }
  
      runBtn.addEventListener('click', () => {
        const token = ++runToken;
        const seeded = seed.checked;
        state.forEach((s) => { s.status = 'Not Run'; s.note = ''; });
        render();
        runBtn.disabled = true;
        summary.textContent = `Running ${runCases.length} simulated tests${seeded ? ' (demo defect seeded)' : ''}…`;
  
        let i = 0;
        function step() {
          if (token !== runToken) return; // cancelled by Reset or a newer run
          if (i >= runCases.length) {
            const t = totals();
            summary.textContent = `Run complete: ${t.Pass} passed, ${t.Fail} failed, ${t.Blocked} blocked. This is a simulation of the demo app on this page.`;
            runBtn.disabled = false;
            return;
          }
          const c = runCases[i];
          state[i].status = 'Running';
          render();
          setTimeout(() => {
            if (token !== runToken) return;
            if (c.blocked) {
              state[i].status = 'Blocked';
              state[i].note = c.blocked;
            } else {
              const r = demoApp(c.input[0], c.input[1], seeded);
              const pass = c.check(r);
              state[i].status = pass ? 'Pass' : 'Fail';
              if (!pass) state[i].note = 'Actual: ' + describeResult(r);
            }
            render();
            i += 1;
            step();
          }, 420);
        }
        step();
      });
      resetBtn.addEventListener('click', () => reset());
      render();
    })();
  
    /* ---------------- Bug report showcase ---------------- */
    (function initBugs() {
      const tabsEl = $('#bugTabs');
      const panel = $('#bugPanel');
      const copyBtn = $('#copyBug');
      let current = 0;
  
      tabsEl.innerHTML = bugReports.map((b) =>
        `<button class="bug-tab" role="tab" type="button" id="bug-tab-${b.id}" aria-selected="false" aria-controls="bugPanel" tabindex="-1">` +
        `<span class="bug-id">${esc(b.id)}</span><span class="bug-title">${esc(b.title)}</span></button>`
      ).join('');
      const tabs = $$('.bug-tab', tabsEl);
  
      function bugText(b) {
        return [
          'BUG REPORT (ILLUSTRATIVE PORTFOLIO EXAMPLE)',
          '',
          `ID: ${b.id}`,
          `Title: ${b.title}`,
          `Environment: ${b.env}`,
          `Severity: ${b.severity}`,
          `Priority: ${b.priority}`,
          `Status: ${b.status}`,
          '',
          `Preconditions: ${b.pre}`,
          '',
          'Steps to Reproduce:',
          ...b.steps.map((s, i) => `${i + 1}. ${s}`),
          '',
          `Expected Result: ${b.expected}`,
          `Actual Result: ${b.actual}`,
          '',
          `Evidence: ${b.evidence}`,
          '',
          'Suggested Regression Tests:',
          ...b.regression.map((r) => `- ${r}`)
        ].join('\n');
      }
  
      const select = makeTabs(tabs, (i) => {
        current = i;
        const b = bugReports[i];
        panel.setAttribute('aria-labelledby', `bug-tab-${b.id}`);
        panel.innerHTML =
          `<div class="bug-top"><span class="bug-id">${esc(b.id)}</span><span class="tag tag--quiet">${esc(b.status)}</span></div>` +
          `<h4 class="bug-name" style="all:unset;display:block;font:500 clamp(1.25rem,2.6vw,1.65rem)/1.25 var(--serif);margin-bottom:1.25rem;">${esc(b.title)}</h4>` +
          `<dl class="meta-grid"><div><dt>Severity</dt><dd>${esc(b.severity)}</dd></div><div><dt>Priority</dt><dd>${esc(b.priority)}</dd></div><div><dt>Status</dt><dd>${esc(b.status)}</dd></div>` +
          `<div class="wide"><dt>Environment</dt><dd>${esc(b.env)}</dd></div></dl>` +
          `<div class="bug-section"><h4>Preconditions</h4><p>${esc(b.pre)}</p></div>` +
          `<div class="bug-section"><h4>Steps to reproduce</h4><ol>${b.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>` +
          `<div class="bug-section"><h4>Expected result</h4><p>${esc(b.expected)}</p></div>` +
          `<div class="bug-section"><h4>Actual result</h4><p>${esc(b.actual)}</p></div>` +
          `<div class="bug-section"><h4>Evidence</h4><div class="evidence">${esc(b.evidence)}</div></div>` +
          `<div class="bug-section"><h4>Suggested regression tests</h4><ul class="bullets">${b.regression.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></div>`;
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = '';
      });
      select(0);
  
      copyBtn.addEventListener('click', () => copyWithFeedback(bugText(bugReports[current]), copyBtn, 'Bug report copied to clipboard.'));
    })();
  
    /* ---------------- Test documentation table ---------------- */
    (function initTestTable() {
      const body = $('#tcBody');
      const search = $('#tcSearch');
      const statusSel = $('#tcStatus');
      const catSel = $('#tcCategory');
      const countEl = $('#tcCount');
      const emptyEl = $('#tcEmpty');
      const dialog = $('#tcDialog');
      const dialogTitle = $('#tcDialogTitle');
      const dialogBody = $('#tcDialogBody');
      const copyBtn = $('#tcCopy');
      let activeTc = null;
      let opener = null;
  
      Array.from(new Set(testCases.map((t) => t.category))).forEach((c) => {
        const o = document.createElement('option');
        o.value = c;
        o.textContent = c;
        catSel.appendChild(o);
      });
  
      function render() {
        const q = search.value.trim().toLowerCase();
        const st = statusSel.value;
        const cat = catSel.value;
        const rows = testCases.filter((t) => {
          if (st && t.status !== st) return false;
          if (cat && t.category !== cat) return false;
          if (!q) return true;
          const hay = [t.id, t.title, t.category, t.pre, t.expected, t.steps.join(' ')].join(' ').toLowerCase();
          return hay.includes(q);
        });
        body.innerHTML = rows.map((t) =>
          `<tr role="row">` +
          `<td role="cell" data-label="Test Case ID"><button class="id-btn" type="button" data-tc="${esc(t.id)}" aria-haspopup="dialog">${esc(t.id)}<span class="sr-only"> — view details</span></button></td>` +
          `<td role="cell" data-label="Scenario"><span class="tc-scenario">${esc(t.title)}</span></td>` +
          `<td role="cell" data-label="Preconditions"><span class="clamp">${esc(t.pre)}</span></td>` +
          `<td role="cell" data-label="Steps">${t.steps.length} steps</td>` +
          `<td role="cell" data-label="Expected"><span class="clamp">${esc(t.expected)}</span></td>` +
          `<td role="cell" data-label="Priority">${esc(t.priority)}</td>` +
          `<td role="cell" data-label="Status">${statusPill(t.status)}</td></tr>`
        ).join('');
        countEl.textContent = `Showing ${rows.length} of ${testCases.length} test cases. Statuses are illustrative.`;
        emptyEl.hidden = rows.length > 0;
      }
      [search, statusSel, catSel].forEach((el) => el.addEventListener('input', render));
      render();
  
      function tcText(t) {
        return [
          'TEST CASE (ILLUSTRATIVE PORTFOLIO EXAMPLE)',
          '',
          `ID: ${t.id}`,
          `Scenario: ${t.title}`,
          `Category: ${t.category}`,
          `Priority: ${t.priority}`,
          `Execution Status: ${t.status}`,
          `Preconditions: ${t.pre}`,
          '',
          'Steps:',
          ...t.steps.map((s, i) => `${i + 1}. ${s}`),
          '',
          `Expected Result: ${t.expected}`,
          `Actual Result (illustrative): ${t.actual}`
        ].join('\n');
      }
  
      function openDialog(t, trigger) {
        activeTc = t;
        opener = trigger;
        dialogTitle.textContent = `${t.id}: ${t.title}`;
        dialogBody.innerHTML =
          `<div class="dialog-meta">${statusPill(t.status)}<span class="tag tag--quiet">${esc(t.category)}</span><span class="tag tag--quiet">Priority: ${esc(t.priority)}</span><span class="tag">Illustrative</span></div>` +
          `<div class="dialog-section"><h4>Preconditions</h4><p>${esc(t.pre)}</p></div>` +
          `<div class="dialog-section"><h4>Steps</h4><ol>${t.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>` +
          `<div class="dialog-section"><h4>Expected result</h4><p>${esc(t.expected)}</p></div>` +
          `<div class="dialog-section"><h4>Actual result (illustrative)</h4><p>${esc(t.actual)}</p></div>`;
        document.body.classList.add('no-scroll');
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      }
      function closeDialog() {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
        onClosed();
      }
      function onClosed() {
        document.body.classList.remove('no-scroll');
        if (opener && document.contains(opener)) opener.focus();
      }
  
      body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-tc]');
        if (!btn) return;
        openDialog(tcById[btn.dataset.tc], btn);
      });
      $('#tcClose').addEventListener('click', closeDialog);
      $('#tcClose2').addEventListener('click', closeDialog);
      dialog.addEventListener('close', onClosed);
      dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDialog(); });
      copyBtn.addEventListener('click', () => { if (activeTc) copyWithFeedback(tcText(activeTc), copyBtn, 'Test case copied to clipboard.'); });
    })();
  
    /* ---------------- Contact ---------------- */
    $('#copyEmail').addEventListener('click', (e) => copyWithFeedback(EMAIL, e.currentTarget, 'Email address copied.'));
  
    (function initContactForm() {
      const form = $('#contactForm');
      const status = $('#cfStatus');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#cfName').value.trim();
        const subject = $('#cfSubject').value.trim() || 'Hello from your portfolio';
        const message = $('#cfMessage').value.trim();
        status.className = 'form-status';
        if (!message) {
          status.textContent = 'Please write a message first.';
          status.classList.add('is-error');
          $('#cfMessage').focus();
          return;
        }
        const bodyText = (name ? `Hi Mohamed,\n\n${message}\n\n${name}` : `Hi Mohamed,\n\n${message}`);
        const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        status.textContent = 'Opening your email app. If nothing opens, use the Copy Email button above. No message has been sent yet.';
        status.classList.add('is-ok');
        window.location.href = href;
      });
    })();
  
    /* ---------------- Footer year & scroll reveal ---------------- */
    $('#year').textContent = new Date().getFullYear();
  
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const targets = $$('.section-head, .about-grid > *, .skills-explorer, .training-grid > *, .project, .lab-grid > *, .subsection, .learning-grid > *, .contact-grid > *');
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      targets.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
    }
  })();
