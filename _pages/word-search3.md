---
layout: default
permalink: /meganal/
title: Meganalysis
description: test test
nav: true
nav_order: 5
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

<style>
    .container {
    max-width: 1200px;
    }
    .page-title {
        text-align: center;
    }
</style>


<style>
    #plot {
        width: 100%;
        height: 500px;
    }
    .hover-text {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        padding: 5px;
        pointer-events: none;
        display: none;
    }
</style>


<style>
    body2 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: white;
        font-family: Arial, sans-serif;
    }
    
  .header {
    text-align: center;
    margin-bottom: 0rem;
  }

    .container2 {
        text-align: center;
    }

    input2 {
        width: 250px;
        padding: 10px;
        font-size: 18px;
        border: 2px solid black;
        border-radius: 5px;
        outline: none;
    }



button2 {
    background: var(--button-bg, black);
    color: var(--button-text, white);
    padding: 5px 10px;
    font-size: 16px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
    border: 2px solid var(--button-bg, black);
    box-sizing: border-box;
}

button2:hover {
    background: var(--button-hover-bg, white);
    color: var(--button-hover-text, black);
    border: 2px solid var(--button-bg, black);
}

:root {
    --button-bg: black;
    --button-text: white;
    --button-hover-bg: white;
    --button-hover-text: black;
}

[data-theme="dark"] {
    --button-bg: white;
    --button-text: black;
    --button-hover-bg: black;
    --button-hover-text: white;
}

@media (prefers-color-scheme: dark) {
    :root[data-theme="system"] {
        --button-bg: white;
        --button-text: black;
        --button-hover-bg: black;
        --button-hover-text: white;
    }
}



    .toggle-container_ps {
        display: flex;
        align-items: center;
    }
    
    .switch_ps {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        padding: 5px 10px;
        margin-top: 8px;
    }
    
    .switch_ps input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider_ps {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #0090ff;
        transition: 0.4s;
        border-radius: 23px;
    }
    
    .slider_ps:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
    
    input:checked + .slider_ps {
        background-color: red;
    }
    
    input:checked + .slider_ps:before {
        transform: translateX(26px);
    }
    
    #toggleLabel_ps {
        margin-left: 5px;
        font-size: 18px;
        color: #333;
        line-height: 33px;
    }

    .js-plotly-plot .plotly .cursor-crosshair {
        cursor: default !important;
    }

  .search-section {
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .charts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0rem;
    justify-content: center;
    margin-bottom: 0.8rem;
    margin-top: 1rem;
  }

        
</style>


<script>
let themeSetting2 = determineThemeSetting();
var isDark;
if (themeSetting2 === "system") {
  isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute('data-theme', 'system');
} else {
  isDark = themeSetting2 === "dark";
  document.documentElement.setAttribute('data-theme', themeSetting2);
}
</script>



<div class="container">
<div class="header">
  <h1>Search for a Word</h1>
</div>

<div style="display: flex; justify-content: center; align-items: center; position: relative; width: 100%;">
    <div class="search-section" style="display: flex; justify-content: center; align-items: center; gap: 10px;">
        <input type="text" id="word-input" style="width:150px; border: 1px solid black;">
        <div id="buttontest">
            <button2 id="search-button">Search</button2>
        </div>
        <div id="buttontest">
            <button2 id="random-button">Random word</button2>
        </div>
        <label class="switch_ps">
            <input type="checkbox" id="neuroPsychToggle_ps" checked>
            <span class="slider_ps"></span>
        </label>
        <span id="toggleLabel_ps" style="color:red;">Psych</span>
    </div>
    <div id="buttonContainer" style="position: absolute; right: 0; top:5px">
        <!-- The button will appear here -->
    </div>
</div>


<div id="sentence0" style="font-size: 1.2rem;  align-items: center; justify-content: center;">
  Enter a word above and figures will appear that illustrate trends among the psych/neuro papers containing said word. These figures are based on a dataset of ~250k empirical psychology papers published from 2004-2024. This webpage was prepared alongside the manuscript <a href="../assets/pdf/Bogdan_2025_PsyChange_Manuscript_SuppMat.pdf">"One Decade Into the Replication Crisis, How Have Psychological Results Changed?"</a> (Bogdan, <i>in press</i>; <i>Adv. Meth. Pract. Psychol. Sci.</i>), although the manuscript did not cover neuroscience.
</div>

<div class="charts-container">
  <div id="chart00" class="chart" style="width: 380px; height: 300px;"></div>
  <div id="chart02" class="chart" style="width: 380px; height: 300px;"></div>
  <div id="chart03" class="chart" style="width: 380px; height: 300px;"></div>
</div>

<div id="sentence1" class="description" style="font-size: 1.2rem;"></div>

<div class="charts-container">
  <div id="chart10" class="chart" style="width: 380px; height: 300px;"></div>
  <div id="chart11" class="chart" style="width: 380px; height: 300px;"></div>
  <div id="chart12" class="chart" style="width: 380px; height: 300px;"></div>
</div>

<div id='sentence2' class="description" style="font-size: 1.2rem;"></div>
<div style="height: 50px;"></div>

<script>
const wordInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log('Is dark:', isDarkMode);
let themeSetting = determineThemeSetting();
console.log(themeSetting);
</script>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="../assets/js/word-search.js"></script>
<script src="../assets/js/url_arg_handling.js"></script>

<script>
function determineThemeSettingMulti() {
    let themeSetting = determineThemeSetting();
    if (themeSetting === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
        return themeSetting;
    }
}

function watchThemeSetting() {
    let currentTheme = determineThemeSettingMulti();
    
    setInterval(() => {
        let newTheme = determineThemeSettingMulti();
        if (newTheme !== currentTheme) {
            document.getElementById('search-button').click();
            currentTheme = newTheme;
        }
    }, 100); // Checks every second
}

watchThemeSetting();
</script>
