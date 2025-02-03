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

<div id="word-search" style="width: 1200px; text-align:center;">
    <h1>Search for a Word</h1>
    <input type="text" id="word-input" value="controlling">
    <button id="search-button">Search</button>
    <br>
    <div style="width:100%; height:100px;">
    <div id='hspace' style="width:1200px; height:10px;"> </div>
    <br>
    <div id='sentence0' style="width:1200px; height:120px;font-size: 19px;"></div>
    <div id='hspace' style="width:1200px; height:10px;"> </div>
    <br>
    <br>
    <div id="chart00" style="width: 300px; height: 300px; display: block; float: left;"></div>
    <div id="chart01" style="width: 300px; height: 300px; display: block; float: left;"></div>
    <div id="chart02" style="width: 300px; height: 300px; display: block; float: left;"></div>
    <div id="chart03" style="width: 300px; height: 300px; display: block; float: left;"></div>
    <br>
    <div style="width: 1200px; height:150px; display: block; float: left;">
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
</script>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="../_pages/word-search.js"></script>
