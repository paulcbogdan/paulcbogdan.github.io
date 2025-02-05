// document.addEventListener("DOMContentLoaded", function() {
//   const toggle_ps = document.getElementById("pn_ps");
//   const label_ps = document.getElementById("toggleLabel_ps");
//
//   // Set default state to "Psych"
//   toggle_ps.checked = true;
//   label_ps.textContent = "Psych";
//
//   // Add event listener to update the label and background color
//   toggle_ps.addEventListener("change", function() {
//     if (toggle_ps.checked) {
//       label_ps.textContent = "Psych";
//       label_ps.style.color = "red"; // Default text color
//     } else {
//       label_ps.textContent = "Neuro";
//       label_ps.style.color = "#0090ff"; // Red text color for "Neuro"
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function() {
  const toggle_ps = document.getElementById("neuroPsychToggle_ps");
  const label_ps = document.getElementById("toggleLabel_ps");


  // Function to get URL parameters
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Get the word from the URL
  const word = getQueryParam("word");
  // console.log('test arg:', word)

  var pn = getQueryParam("psych_neuro");
  console.log("pn", pn);
  if (pn !== null) {

    if (pn === "true" || pn === "1") {
      pn = true;
    } else {
      pn = false; // Default value if the parameter is missing or invalid
    }

    // Fill the input field with the word
    // const inputField = document.getElementById("psych-neuro-input");
    toggle_ps.checked = pn;
    console.log("check via param", pn);
    if (toggle_ps.checked) {
      console.log("set psych");
      label_ps.textContent = "Psych";
      label_ps.style.color = "red"; // Default text color
    } else {
      console.log("set neuro");
      label_ps.textContent = "Neuro";
      label_ps.style.color = "#0090ff"; // Red text color for "Neuro"
    }
  } else {
    toggle_ps.checked = true;
  }

  // Set default state to "Psych"

  // label_ps.textContent = "Psych";

  // Add event listener to update the label and background color
  toggle_ps.addEventListener("change", function() {
    if (toggle_ps.checked) {
      label_ps.textContent = "Psych";
      label_ps.style.color = "red"; // Default text color
    } else {
      label_ps.textContent = "Neuro";
      label_ps.style.color = "#0090ff"; // Red text color for "Neuro"
    }
  });


  if (word) {
    // Fill the input field with the word
    const inputField = document.getElementById("word-input");
    inputField.value = word;

    // Simulate the button click
    const searchButton = document.getElementById("search-button");
    searchButton.click();
  }


});


function showButton() {
  // Create a new button element
  const newButton = document.createElement("button2");
  //
  // // // Set the button's text
  console.log("Show button");
  newButton.innerText = "&nbsp;&nbsp;Share";
  // //
  // // // Optionally, add an event listener to the new button
  // // newButton.addEventListener("click", function() {
  // //     alert("New Button Clicked!");
  // // });
  //
  //
  // // Add hover text using the title attribute
  newButton.title = "Copy sharable\nlink to clipboard";
  // newButton.width = "150px";
  //
  // // Optionally, add a custom tooltip (uncomment the HTML and CSS for tooltip styling)
  // newButton.classList.add("tooltip");
  // const tooltipText = document.createElement("span");
  // tooltipText.classList.add("tooltiptext");
  // tooltipText.innerText = "Copy sharable link to clipboard";
  // newButton.appendChild(tooltipText);
  //
  // Add an event listener to the new button

  word = wordInput.value.trim().toLowerCase();
  const base_url = location.protocol + "//" + location.host + location.pathname;
  const toggle_ps = document.getElementById("neuroPsychToggle_ps");

  newButton.addEventListener("click", function() {
    // Copy a specific string to the clipboard
    const textToCopy = base_url + "?word=" + word + "&psych_neuro=" + toggle_ps.checked; // Replace with your desired string
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Temporarily change the button text to "Copied!"
        newButton.innerText = "Copied!";
        setTimeout(() => {
          newButton.innerText = "Share";
        }, 2000); // Reset the text after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });
  //
  // // Append the new button to the container
  const container = document.getElementById("buttonContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(newButton);
};

