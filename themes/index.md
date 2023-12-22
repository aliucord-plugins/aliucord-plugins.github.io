---
layout: page
title: Themes
has_children: false
nav_order: 3
---

# Aliucord themes

If you want a theme to be added please create a issue on the Github page.

**Make sure to install Themer plugin!**

 <style>
    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    input, select, option {
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: 1em;
        outline: none;
    }
    
    option {
        background-color: #333;
    }
    
    .menu {
        display: flex;
        background-color: #333;
        border-radius: 4px;
        margin-bottom: 1em;
    }
    
    input {
        padding: 1em;
        min-width: 10em;
    }
    
    ::placeholder, label {
        color: #888; 
    }
    
    .select {
        position: relative;
        width: 10em;
        margin: 0 0.5em;
    }
    
    .select label {
        position: absolute;
        top: 0.25em;
        left: 0;
        font-size: 0.7em;
        
    }
    
    .select select {
        padding: 0.5em 0;
        margin: 0.5em 0;
    }
    
    .theme {
        display: flex;
        background-color: #222;
        margin: 0.5em 0;    
        padding: 0.5em;
        border-radius: 4px;
    }
    
    .theme .title {
        display: flex;
    }
    
    .theme .desc {
        flex-grow: 1;
        margin-right: 0.5em;
    }
    
    .theme .links {
        flex-grow: 0;
    }
    
    .theme .platforms img {
        display: inline-block;
        width: 1em;
        height: 1em;   
        margin-left: 0.5em;
    }
    
    .theme .name {
        font-weight: bold;
    }
    
    .theme .author {
        margin-left: 0.5em;
        font-style: italic;
        color: #666;
    }
    
    .theme .links {
        flex-grow: 0;
        flex-shrink: 0;
    }
    
    .theme .links a {
        text-decoration: none;
        width: 3em;
        height: 3em;
        margin: 0.2em;
        padding: 0;
        display: inline-block;
    }
    
    .theme .links img {
        width: 100%;
        height: 100%;
        display: inline-block;
    }    
 </style>

<div id="theme-0" class="theme">
                <div class="desc">
                    <div class="title">
                        <div class="name">Themer</div>
                        <div class="author">Aliucord</div>
                    </div>
                    <div class="description">Xposed module that allows you to change colors in Discord. Requires enabled Resource Hooks in EdXposed / LSPosed Manager settings.</div>
                </div>
                <div class="links"><a href="https://github.com/Aliucord/DiscordThemer/releases/download/v0.0.3/DiscordThemer-v0.0.3.apk" target="_blank">
                    <img alt="download" src="/assets/theme_browser/icons/download.svg">
                    </a><a href="https://github.com/Aliucord/DiscordThemer" target="_blank">
                    <img alt="github" src="/assets/theme_browser/icons/github.svg">
                    </a></div>
                </div>
----

<theme-browser></theme-browser>
