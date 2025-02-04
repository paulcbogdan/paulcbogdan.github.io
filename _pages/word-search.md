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

    .buttons2 {
        margin-top: 15px;
    }

    button2 {
        background: black;
        color: white;
        padding: 5px 10px;
        font-size: 16px;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
        transition: 0.3s;
        border: 2px solid black;
        box-sizing: border-box; /* Ensures the size stays the same */
    }

    button2:hover {
        background: white;
        color: black;
        border: 2px solid black;
    }
</style>



<div id="word-search" style="width: 1200px; text-align:center;">
    <h1>Search for a Word</h1>
    <div id='hspace1' style="width:1200px; height:5px;"> </div>
    <input type="text" id="word-input" style="width:150px; border: 1px solid black;">
    <button2 id="search-button">Search</button2>
    <button2 id="random-button">Random word</button2>
    <div id='hspace0' style="width:1200px; height:25px;"> </div>
    <div id='sentence0' style="width:1200px; height:120px;font-size: 19px;">Enter a word above and figures will appear that illustrate trends among the psychology papers containing said word.<br>This webpage was prepared alongside the manuscript <a href="../assets/pdf/Bogdan_2025_PsyChange_Manuscript_SuppMat.pdf">"One Decade Into the Replication Crisis, How Have Psychological Results Changed?"</a> (Bogdan, 2025; <i>Adv. Meth. Pract. Psychol. Sci.</i>).</div>
    <div id='hspace1' style="width:1200px; height:30px;"> </div>
    <div id="chart00" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart02" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart03" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <br>
    <div id='hspace2' style="width:1200px; height:100px;"> </div>
    <br>
    <div id='hspace3' style="width:1200px; height:180px;"> </div>
    <div id='sentence1' style="width:1200px; height:90px;font-size: 19px;"></div>
    <br>
    <div id="chart10" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart11" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart12" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <br>
    <div id="chart20" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart21" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart22" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <br>
    <div style="width:100%; height:100px;">
    <div id="hover-text" class="hover-text"></div>
    <div id="plot" style="width: 800px; height: 800px; display: block; float: left;"></div>


</div>

<script>
const wordInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
</script>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="../assets/js/word-search.js"></script>
