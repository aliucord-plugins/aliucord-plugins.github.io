class PluginBrowser extends HTMLElement {
    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div class="menu">
            <input id="search" type="text" placeholder="Search...">
        </div>

        <div id="search-results" class="results"></div>
        `;

        let styleElement = document.createElement("style");
        styleElement.textContent = `
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
        
        .plugin {
            display: flex;
            background-color: #222;
            margin: 0.5em 0;    
            padding: 0.5em;
            border-radius: 4px;
        }
        
        .plugin .title {
            display: flex;
        }
        
        .plugin .desc {
            flex-grow: 1;
            margin-right: 0.5em;
        }
        
        .plugin .links {
            flex-grow: 0;
        }
        
        .plugin .platforms img {
            display: inline-block;
            width: 1em;
            height: 1em;   
            margin-left: 0.5em;
        }
        
        .plugin .name {
            font-weight: bold;
        }
        
        .plugin .author {
            margin-left: 0.5em;
            font-style: italic;
            color: #666;
        }
        
        .plugin .links {
            flex-grow: 0;
            flex-shrink: 0;
        }
        
        .plugin .links a {
            text-decoration: none;
            width: 3em;
            height: 3em;
            margin: 0.2em;
            padding: 0;
            display: inline-block;
        }
        
        .plugin .links img {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
        
        `;
        this.shadowRoot.prepend(styleElement);

        this.shadowRoot.querySelectorAll("input, select").forEach((element) => {
            //element.addEventListener("change", () => this.update());
            element.addEventListener("input", () => this.update());
        });

        this.fetchHocon(`/assets/plugin_browser/plugins.conf`).then((plugins) => {
            this.plugins = plugins;
            this.plugins.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });

            let resultElement = this.shadowRoot.getElementById("search-results");
            this.plugins.forEach((plugin, id) => {
                let element = document.createElement("div");
                element.id = "plugin-" + id;
                element.classList.add("plugin");
                element.plugin = plugin;
                element.innerHTML = `
                <div class="desc">
                    <div class="title">
                        <div class="name">${plugin.name}</div>
                        <div class="author">by ${plugin.author}</div>
                    </div>
                    <div class="description">${plugin.description
                        .trim()
                        .replaceAll("<", "&lt;")
                        .replaceAll(">", "&gt;")
                        .replaceAll("\n", "<br>")}</div>
                </div>
                <div class="links"></div>
                `;
                    
                let linksElement = element.getElementsByClassName("links").item(0);
                for (id in plugin.links) {
                    let link = plugin.links[id];
                    let element = document.createElement("a");
                    element.href = link;
                    element.target = "_blank";
                    element.innerHTML = `
                    <img alt="${id}" src="/assets/plugin_browser/icons/${id}.svg">
                    `;
                    linksElement.append(element);
                }

                resultElement.append(element);
            });

            this.update();
        });
    }

    update() {
        let search = this.shadowRoot.getElementById("search").value;

        this.plugins.forEach((plugin, id) => {
            let element = this.shadowRoot.getElementById("plugin-" + id);

            let match = true;
            if (search) {
                if (
                    (!plugin.name || !plugin.name.toLowerCase().includes(search.toLowerCase())) &&
                    (!plugin.description || !plugin.description.toLowerCase().includes(search.toLowerCase()))
                )
                    match = false;
            }

            if (match) {
                element.style.display = null;
            } else {
                element.style.display = "none";
            }
        });
    }

    async fetchHocon(url) {
        return fetch(url)
            .then((res) => res.text())
            .then((value) => parseHocon(value));
    }

    compareVersions(version1, version2) {
        if (!(version1 && version2)) return 0;

        version1 = version1.split(".");
        version2 = version2.split(".");

        for (let i = 1; i < Math.max(version1.length, version2.length); i++) {
            let a = i < version1.length ? Number.parseInt(version1[i]) : 0;
            let b = i < version2.length ? Number.parseInt(version2[i]) : 0;

            if (a > b) return 1;
            if (a < b) return -1;
        }

        return 0;
    }
}

customElements.define("plugin-browser", PluginBrowser);
