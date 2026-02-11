// COUNTDOWN
var countDownDate = new Date("Feb 17, 2026 08:00:00").getTime();

setInterval(function() {

  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("countdown").innerHTML =
  "⏳ " + days + " Days " + hours + " Hours to Go";

}, 1000);


// 🔴 REPLACE THIS WITH YOUR GOOGLE SHEET CSV LINK
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDDlAIBb-jfG2fpkBpE22dzit5YyH044L0ZnI62Q5dkjWWQkwmYH9p3gXj8VtINFCAWEay6YEx6Vsz/pub?gid=2035330145&single=true&output=csv";

function fetchStatus() {
  fetch(sheetURL + "&t=" + new Date().getTime())
    .then(response => response.text())
    .then(data => {
      let rows = data.trim().split("\n");

      if (rows.length > 1) {
        rows.shift();
      }

      let lastRow = rows[rows.length - 1];

      if (lastRow) {
        document.getElementById("tripStatus").innerHTML =
          "🚍 " + lastRow;
      } else {
        document.getElementById("tripStatus").innerHTML =
          "🕒 Waiting for update...";
      }
    })
    .catch(error => {
      document.getElementById("tripStatus").innerHTML =
        "⚠️ Unable to load status";
    });
}

// Run on load
fetchStatus();

// Auto refresh every 30 seconds
setInterval(fetchStatus, 30000);

document.addEventListener("DOMContentLoaded", function () {

  fetchStatus(); // Run immediately

  setInterval(function () {
    fetchStatus();
  }, 30000); // every 30 seconds

});
