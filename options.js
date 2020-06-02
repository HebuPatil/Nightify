// Saves options to chrome.storage
function save_options() {
  var defaultMode = document.getElementById('defmode').value;
  chrome.storage.sync.set({
    defaultMode: defaultMode
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Preferences Saved';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    defaultMode: '1'
  }, function(items) {
    document.getElementById('defmode').value = items.defaultMode;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
