function darkenSetState(state) {
  if (state === "1") {
    document.documentElement.classList.toggle("thecolors", false);
    document.documentElement.classList.toggle("inversion", true);
    chrome.runtime.sendMessage({state: "On"});
  } else if (state === "2") {
    document.documentElement.classList.toggle("thecolors", true);
    document.documentElement.classList.toggle("inversion", false);
    chrome.runtime.sendMessage({state: "Off"});
  }
}

function darkenFromState() {
  var state = localStorage.getItem("darken-state");
  if (state === null) {
    state = localStorage.getItem("darken-default-state");
    chrome.runtime.sendMessage({setting: "need-default-state"}, function(response) {
      if (state != response) {
        state = response;
        localStorage.setItem("darken-default-state", state);
        darkenSetState(state)
      }
    });
  }
  darkenSetState(state);
};
darkenFromState();
