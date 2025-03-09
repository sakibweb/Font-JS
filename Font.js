class Font {
  constructor(providerName, fontConfig) {
      this.providerName = providerName ? providerName.toLowerCase() : this._detectProvider(fontConfig);
      this.fontConfig = fontConfig;
      this.providers = {
          google: this._loadGoogleFont.bind(this),
          go: this._loadGoogleFont.bind(this),
          g: this._loadGoogleFont.bind(this),
          adobe: this._loadAdobeFont.bind(this),
          ad: this._loadAdobeFont.bind(this),
          a: this._loadAdobeFont.bind(this),
          typekit: this._loadAdobeFont.bind(this),
          type: this._loadAdobeFont.bind(this),
          kit: this._loadAdobeFont.bind(this),
          ty: this._loadAdobeFont.bind(this),
          tk: this._loadAdobeFont.bind(this),
          font_awesome: this._loadFontAwesome.bind(this),
          font: this._loadFontAwesome.bind(this),
          wesome: this._loadFontAwesome.bind(this),
          fo: this._loadFontAwesome.bind(this),
          we: this._loadFontAwesome.bind(this),
          fw: this._loadFontAwesome.bind(this),
          bunny: this._loadBunnyFont.bind(this),
          bun: this._loadBunnyFont.bind(this),
          bu: this._loadBunnyFont.bind(this),
          fontshare: this._loadFontshareFont.bind(this),
          sh: this._loadFontshareFont.bind(this),
          fs: this._loadFontshareFont.bind(this),
          local: this._loadLocalFont.bind(this),
          lo: this._loadLocalFont.bind(this),
          custom: this._loadCustomFont.bind(this),
          selfhosted: this._loadCustomFont.bind(this),
      };
  }

  _detectProvider(fontConfig) {
      if (fontConfig.projectId || fontConfig.kitId) {
          return 'adobe'; // or 'typekit'
      }
      if (fontConfig.family || fontConfig.name && fontConfig.provider === 'google') { // Provider hint
          return 'google';
      }
      if (fontConfig.cdn === 'fontawesome' || fontConfig.iconSet) { // Heuristic for Font Awesome
          return 'font_awesome';
      }
      if (fontConfig.provider === 'bunny' || fontConfig.bunnyFontFamily) { // Provider hint
          return 'bunny';
      }
      if (fontConfig.provider === 'fontshare' || fontConfig.fontshareId) { // Provider hint
          return 'fontshare';
      }
      if (fontConfig.localFontName || fontConfig.localSrc) { // Heuristic for local fonts
          return 'local';
      }
      if (fontConfig.url || fontConfig.css || (fontConfig.name && fontConfig.src)) {
          return 'custom'; // Or 'selfhosted'
      }
      return 'custom'; // Default to custom if no provider is clearly detected
  }


  load() {
      return new Promise((resolve, reject) => {
          const loader = this.providers[this.providerName];
          if (!loader) {
              reject(`Provider "${this.providerName}" is not supported or could not be detected.`);
              return;
          }

          loader(this.fontConfig, resolve, reject);
      });
  }

  _loadGoogleFont(fontConfig, resolve, reject) {
      if (!fontConfig.name && !fontConfig.family) { // Accept both 'name' and 'family' for Google Fonts
          reject("Font name or family is required for Google Fonts.");
          return;
      }

      const fontName = (fontConfig.name || fontConfig.family).replace(/\s+/g, '+'); // Prepare font name for URL
      let weights = fontConfig.weight || fontConfig.weights || '400'; // Accept both 'weight' and 'weights'
      let styles = fontConfig.style || fontConfig.styles || 'normal'; // Accept both 'style' and 'styles'
      let subsets = fontConfig.subset || fontConfig.subsets; // Accept both 'subset' and 'subsets'
      let display = fontConfig.display || 'swap'; // Allow custom display option

      // Construct Google Fonts URL
      let googleFontURL = `https://fonts.googleapis.com/css2?family=${fontName}`;

      if (weights) {
          if (typeof weights === 'string' || typeof weights === 'number') {
              googleFontURL += `:wght@${weights}`;
          } else if (Array.isArray(weights)) {
              googleFontURL += `:wght@${weights.join(';')}`; // e.g., 400;700
          }
      }
      if (styles && styles !== 'normal') {
          // No explicit style parameter needed for Google Fonts in most cases with weight
      }
      if (subsets) {
          if (typeof subsets === 'string') {
              googleFontURL += `&subset=${subsets}`;
          } else if (Array.isArray(subsets)) {
              googleFontURL += `&subset=${subsets.join(',')}`;
          }
      }
      googleFontURL += `&display=${display}`;

      this._loadCSS(googleFontURL, fontConfig, resolve, reject, fontName.replace(/\+/g, ' ')); // Pass font name for class generation
  }

  _loadAdobeFont(fontConfig, resolve, reject) {
      let projectId = fontConfig.projectId || fontConfig.kitId; // Accept both projectId and kitId
      if (!projectId) {
          reject("Adobe Fonts Project ID or Kit ID is required for Adobe Fonts.");
          return;
      }

      const adobeFontURL = `https://use.typekit.net/${projectId}.css`; // Standard Typekit URL

      this._loadCSS(adobeFontURL, fontConfig, resolve, reject); // No font name needed, Adobe manages its own
  }

  _loadFontAwesome(fontConfig, resolve, reject) {
      let fontAwesomeURL = '';
      if (fontConfig.url) {
          fontAwesomeURL = fontConfig.url;
      } else if (fontConfig.version) {
          fontAwesomeURL = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${fontConfig.version}/css/all.min.css`;
      } else {
          fontAwesomeURL = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'; // Default to latest FA 6.x, consider CDNjs or similar
      }

      this._loadCSS(fontAwesomeURL, fontConfig, resolve, reject); // No font name needed, Font Awesome has its own classes
  }


  _loadBunnyFont(fontConfig, resolve, reject) {
      if (!fontConfig.family && !fontConfig.bunnyFontFamily) { // Accept both 'family' and 'bunnyFontFamily'
          reject("Font family (bunnyFontFamily or family) is required for Bunny Fonts.");
          return;
      }

      const fontFamily = fontConfig.family || fontConfig.bunnyFontFamily;
      const variants = fontConfig.variants || fontConfig.weights || fontConfig.variant; // Accept variants, weights, variant
      const subsets = fontConfig.subsets || fontConfig.subset; // Accept subsets, subset
      const format = fontConfig.format || 'css2'; // Default to css2, can be 'woff2' for direct download

      let bunnyFontURL = `https://fonts.bunny.net/${format}?family=${fontFamily.replace(/\s+/g, '+')}`;

      if (variants) {
          if (typeof variants === 'string') {
              bunnyFontURL += `&variant=${variants}`;
          } else if (Array.isArray(variants)) {
              bunnyFontURL += `&variant=${variants.join(',')}`;
          }
      }
      if (subsets) {
          if (typeof subsets === 'string') {
              bunnyFontURL += `&subset=${subsets}`;
          } else if (Array.isArray(subsets)) {
              bunnyFontURL += `&subset=${subsets.join(',')}`;
          }
      }

      this._loadCSS(bunnyFontURL, fontConfig, resolve, reject, fontFamily); // Pass font family for class generation
  }


  _loadFontshareFont(fontConfig, resolve, reject) {
      if (!fontConfig.id && !fontConfig.fontshareId) { // Accept both 'id' and 'fontshareId'
          reject("Font ID (fontshareId or id) is required for Fontshare.");
          return;
      }
      const fontId = fontConfig.id || fontConfig.fontshareId;
      const fontshareURL = `https://fontshare.com/api/css?f=${fontId}`;

      this._loadCSS(fontshareURL, fontConfig, resolve, reject); // Fontshare handles font-family in CSS
  }


  _loadLocalFont(fontConfig, resolve, reject) {
      if (!fontConfig.localFontName && !fontConfig.name) { // Accept both localFontName and name
          reject("Font name (localFontName or name) is required for local fonts.");
          return;
      }
      if (!fontConfig.localSrc && !fontConfig.src) { // Accept both localSrc and src
          reject("Font source (localSrc or src) is required for local fonts.");
          return;
      }

      const localFontName = fontConfig.localFontName || fontConfig.name;
      const localSrc = fontConfig.localSrc || fontConfig.src;

      const cssRules = this._generateFontFaceRule({
          name: localFontName,
          src: localSrc,
          weight: fontConfig.weight,
          style: fontConfig.style,
          ...fontConfig // Inherit other potential fontFace properties
      });

      this._createAndInjectCSS(cssRules, fontConfig, resolve, reject, localFontName); // Pass font name for class generation
  }


  _loadCustomFont(fontConfig, resolve, reject) {
      if (fontConfig.url) {
          this._loadCSS(fontConfig.url, fontConfig, resolve, reject); // No font name needed if URL is provided, assuming CSS contains it
      } else if (fontConfig.css) {
          this._createAndInjectCSS(fontConfig.css, fontConfig, resolve, reject); // No font name needed if CSS rules are provided
      } else if (fontConfig.name && fontConfig.src) {
          const cssRules = this._generateFontFaceRule(fontConfig);
          this._createAndInjectCSS(cssRules, fontConfig, resolve, reject, fontConfig.name); // Pass font name for class generation
      } else {
          reject("For 'custom' or 'selfhosted' provider, you must provide 'url', 'css', or both 'name' and 'src' in fontConfig.");
      }
  }


  _loadCSS(url, fontConfig, resolve, reject, fontNameForClass) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
          if (fontConfig.use) {
              this._applyFontClass(fontConfig.use, fontNameForClass || fontConfig.name, fontConfig); // Pass fontConfig
          }
          resolve();
      };
      link.onerror = () => {
          reject(`Failed to load CSS from URL: ${url}`);
      };
      document.head.appendChild(link);
  }

  _createAndInjectCSS(cssRules, fontConfig, resolve, reject, fontNameForClass) {
      const style = document.createElement('style');
      style.textContent = cssRules;
      document.head.appendChild(style);
      if (fontConfig.use) {
          this._applyFontClass(fontConfig.use, fontNameForClass || fontConfig.name, fontConfig); // Pass fontConfig
      }
      resolve(); // Assume CSS injection is successful. More robust check might be needed for complex scenarios.
  }


  _generateFontFaceRule(fontConfig) {
      let fontFaceRule = `@font-face {\n`;
      fontFaceRule += `  font-family: '${fontConfig.name}';\n`;
      fontFaceRule += `  src: url('${fontConfig.src}')`; // Basic src, could be expanded for format hints

      let formatHint = 'woff2'; // Default format hint - you might need to detect or allow configuration
      if (fontConfig.src.endsWith('.woff')) formatHint = 'woff';
      if (fontConfig.src.endsWith('.ttf')) formatHint = 'truetype';
      if (fontConfig.src.endsWith('.otf')) formatHint = 'opentype';
      if (fontConfig.src.endsWith('.svg')) formatHint = 'svg';
      if (fontConfig.src.endsWith('.eot')) formatHint = 'embedded-opentype';

      fontFaceRule += ` format('${formatHint}');\n`; // Add format hint

      if (fontConfig.weight || fontConfig.fontWeight) { // Accept both 'weight' and 'fontWeight'
          fontFaceRule += `  font-weight: ${fontConfig.weight || fontConfig.fontWeight};\n`;
      }
      if (fontConfig.style || fontConfig.fontStyle) { // Accept both 'style' and 'fontStyle'
          fontFaceRule += `  font-style: ${fontConfig.style || fontConfig.fontStyle};\n`;
      }
      if (fontConfig.display) {
          fontFaceRule += `  font-display: ${fontConfig.display};\n`;
      } else {
          fontFaceRule += `  font-display: swap;\n`; // Default font-display: swap for better performance
      }

      // Add unicode-range, font-stretch, etc. if needed based on fontConfig

      fontFaceRule += `}\n`;
      return fontFaceRule;
  }


  _applyFontClass(className, fontName, fontConfig) {
      if (className && fontName) {
          let styleElement = document.getElementById(`font-style-${className.replace(/[^a-zA-Z0-9]/g, '-')}`);
          if (!styleElement) {
              styleElement = document.createElement('style');
              styleElement.id = `font-style-${className.replace(/[^a-zA-Z0-9]/g, '-')}`;
              document.head.appendChild(styleElement);
          }
          let cssText = `\n${className} {\n  font-family: "${fontName}", sans-serif;\n`;
          if (fontConfig.weight || fontConfig.fontWeight) {
              cssText += `  font-weight: ${fontConfig.weight || fontConfig.fontWeight};\n`;
          }
          if (fontConfig.style || fontConfig.fontStyle) {
              cssText += `  font-style: ${fontConfig.style || fontConfig.fontStyle};\n`;
          }
          if (fontConfig.fontDisplay) { // Use fontDisplay from fontConfig for class style, not global display
              cssText += `  font-display: ${fontConfig.fontDisplay};\n`;
          }
          cssText += `}\n`;
          styleElement.textContent = cssText;
      } else if (className) {
          document.documentElement.classList.add(className.substring(1));
      }
  }
}
