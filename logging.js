// First time playing with SW? This script is just for logging,
// you can pretty much ignore it until you want to dive deeper.

if (!navigator.serviceWorker.controller) {
  console.log("This page is not controlled by a ServiceWorker");
}
else {
  console.log("This page is controlled by a ServiceWorker");
}

navigator.serviceWorker.getRegistration().then(function(reg) {
  function showWaitingMessage() {
    console.log("A new ServiceWorker is waiting to become active. It can't become active now because pages are still open that are controlled by the older version. Either close those tabs, or shift+reload them (which loads them without the ServiceWorker). That will allow the new version to become active, so it'll be used for the next page load.");
  }

  reg.addEventListener('updatefound', function() {
    console.log("Found a new ServiceWorker!");
    var installing = reg.installing;
    reg.installing.addEventListener('statechange', function() {
      if (installing.state == 'installed') {
        console.log("New ServiceWorker installed.");
        // give it a second to see if it activates immediately
        setTimeout(function() {
          if (installing.state == 'activated') {
            console.log("New ServiceWorker activated! Reload to load this page with the new ServiceWorker.");
          }
          else {
            showWaitingMessage();
          }
        }, 1000);
      }
      else if (installing.state == 'redundant') {
        console.log("The new worker failed to install - likely an error during install");
      }
    });
  });

  if (reg.waiting) {
    showWaitingMessage();
  }
});