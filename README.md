# Font.js: Dynamic Font Loader

Effortlessly load fonts from various providers like Google Fonts, Adobe Fonts, Font Awesome, Bunny Fonts, Fontshare, and even local or custom fonts with a simple and consistent JavaScript class.

## Features

*   **Provider Agnostic:** Supports multiple font providers including Google Fonts, Adobe Fonts (Typekit), Font Awesome, Bunny Fonts, Fontshare, Local Fonts, and Custom/Self-hosted fonts.
*   **Automatic Provider Detection:**  Intelligently detects the font provider based on your configuration, or you can explicitly specify it.
*   **Promise-Based Loading:** Uses Promises for asynchronous font loading, allowing you to easily handle success and error scenarios.
*   **Flexible Configuration:**  Offers a wide range of configuration options tailored to each font provider, covering font families, weights, styles, subsets, project IDs, CDN URLs, and more.
*   **CSS Injection:**  Dynamically injects the necessary CSS into the `<head>` of your document to load the fonts.
*   **Font Class Application (Optional):**  Automatically applies a CSS class to your elements to use the loaded font, making integration seamless.
*   **Local and Custom Font Support:**  Load fonts directly from your local server or specify custom CSS for self-hosted fonts.
*   **Error Handling:**  Provides clear error messages when font loading fails or configuration is incorrect.

## Installation

To use Font.js, simply include the code in your JavaScript project. You can copy and paste the entire `Font` class code directly into your script or create a separate `Font.js` file and include it in your HTML:

```html
<script src="Font.js"></script>
<script>
  // Your font loading code here
</script>
```
### CDN
```html
<script src="https://cdn.jsdelivr.net/gh/sakibweb/Font-JS@main/Font.min.js"></script>
```


Alternatively, if you are using a module bundler (like Webpack or Parcel), you can save the code as `Font.js` and import it:

```javascript
import Font from './Font.js'; // Or the path to your Font.js file

// Your font loading code here
```

## Usage

Using the `Font` class is straightforward. Create a new `Font` instance with the desired provider name (optional, if it can be detected) and a configuration object specific to the provider. Then, call the `load()` method to initiate font loading.

Here are examples for each supported font provider:

### Google Fonts

```javascript
const googleFont = new Font('google', {
  name: 'Roboto', // or family: 'Roboto'
  weights: [400, 700], // or weight: 400, or weights: '400;700'
  subsets: ['latin', 'cyrillic'], // or subset: 'latin'
  display: 'swap', // Optional: 'auto', 'block', 'fallback', 'optional', 'swap'
  use: '.my-text-class' // Optional: CSS class to apply the font to
});

googleFont.load()
  .then(() => console.log('Google Font loaded successfully!'))
  .catch(error => console.error('Failed to load Google Font:', error));
```

**Configuration Options for Google Fonts:**

*   `name` or `family`: (Required) The name of the Google Font family (e.g., 'Roboto', 'Open Sans'). Use either `name` or `family`.
*   `weights` or `weight`: (Optional) Font weights to load. Can be a string, number, or an array of strings/numbers. Examples: `'400'`, `400`, `[400, 700]`, `'400;700'`. Defaults to `400`.
*   `styles` or `style`: (Optional) Font styles to load. Can be a string or an array of strings. Examples: `'italic'`, `['normal', 'italic']`. Defaults to `normal`.  *(Note: For Google Fonts, styles are often implicitly handled by weights, so you may not need to explicitly specify styles in many cases.)*
*   `subsets` or `subset`: (Optional) Font subsets to load (e.g., 'latin', 'cyrillic', 'vietnamese'). Can be a string or an array of strings.
*   `display`: (Optional)  Defines how font files are downloaded and used by the browser. Options: `'auto'`, `'block'`, `'fallback'`, `'optional'`, `'swap'`. Defaults to `'swap'` for better performance.
*   `use`: (Optional) CSS class selector (e.g., `.my-text-class`, `#my-element`) to apply the loaded font to. This will create a CSS rule setting `font-family`, `font-weight`, `font-style`, and `font-display` for the specified class.

### Adobe Fonts (Typekit)

```javascript
const adobeFont = new Font('adobe', {
  projectId: 'your-adobe-project-id' // or kitId: 'your-adobe-kit-id'
  // use: '.my-adobe-text' // Optional: CSS class to apply the font
});

adobeFont.load()
  .then(() => console.log('Adobe Font loaded successfully!'))
  .catch(error => console.error('Failed to load Adobe Font:', error));
```

**Configuration Options for Adobe Fonts:**

*   `projectId` or `kitId`: (Required) Your Adobe Fonts Project ID or Kit ID. Use either `projectId` or `kitId`.
*   `use`: (Optional) CSS class selector to apply the font.

### Font Awesome

```javascript
const fontAwesome = new Font('font_awesome', {
  version: '6.5.1' // Optional: Specify Font Awesome version. Defaults to latest 6.x.
  // url: 'path/to/your/font-awesome.css' // Optional: Use a custom Font Awesome CSS URL
  // use: '.fa-icons' // Optional: CSS class to apply Font Awesome styles
});

fontAwesome.load()
  .then(() => console.log('Font Awesome loaded successfully!'))
  .catch(error => console.error('Failed to load Font Awesome:', error));
```

**Configuration Options for Font Awesome:**

*   `version`: (Optional) Specify the Font Awesome version to load from CDNjs. Defaults to the latest 6.x version (`6.5.1` at the time of writing).
*   `url`: (Optional)  Provide a custom URL to your Font Awesome CSS file. If provided, `version` is ignored.
*   `use`: (Optional) CSS class selector to apply Font Awesome styles (though Font Awesome usually applies styles globally).

### Bunny Fonts

```javascript
const bunnyFont = new Font('bunny', {
  family: 'Nunito', // or bunnyFontFamily: 'Nunito'
  variants: ['400', '700', 'italic'], // or variant: '400', or weights: '400;700'
  subsets: ['latin', 'cyrillic'], // or subset: 'latin'
  format: 'css2', // Optional: 'css2' (default), 'woff2' (direct download link)
  use: '.bunny-text' // Optional: CSS class to apply the font
});

bunnyFont.load()
  .then(() => console.log('Bunny Font loaded successfully!'))
  .catch(error => console.error('Failed to load Bunny Font:', error));
```

**Configuration Options for Bunny Fonts:**

*   `family` or `bunnyFontFamily`: (Required) The font family name from Bunny Fonts (e.g., 'Nunito', 'Open Sans'). Use either `family` or `bunnyFontFamily`.
*   `variants` or `weights` or `variant`: (Optional) Font variants or weights. Can be a string, array, or number. Examples: `'400'`, `400`, `['400', '700']`, `'400,700'`, `'italic'`.
*   `subsets` or `subset`: (Optional) Font subsets to load (e.g., 'latin', 'cyrillic'). Can be a string or an array of strings.
*   `format`: (Optional)  Font format to request. `'css2'` (default, loads CSS file) or `'woff2'` (returns direct download link - *currently loads CSS even with 'woff2'*).
*   `use`: (Optional) CSS class selector to apply the font.

### Fontshare

```javascript
const fontshareFont = new Font('fontshare', {
  fontshareId: 'your-fontshare-id' // or id: 'your-fontshare-id'
  // use: '.fontshare-text' // Optional: CSS class to apply the font
});

fontshareFont.load()
  .then(() => console.log('Fontshare Font loaded successfully!'))
  .catch(error => console.error('Failed to load Fontshare Font:', error));
```

**Configuration Options for Fontshare:**

*   `fontshareId` or `id`: (Required) Your Fontshare Font ID. Use either `fontshareId` or `id`.
*   `use`: (Optional) CSS class selector to apply the font.

### Local Fonts

```javascript
const localFont = new Font('local', {
  localFontName: 'MyCustomFont', // or name: 'MyCustomFont' - The name you will use in CSS
  localSrc: 'url(/fonts/MyCustomFont.woff2) format("woff2")', // or src: 'url(/fonts/MyCustomFont.woff2) format("woff2")' - Path to your font file(s)
  weight: 700, // Optional: Font weight
  style: 'italic', // Optional: Font style
  display: 'fallback', // Optional: font-display property
  // use: '.local-text' // Optional: CSS class to apply the font
});

localFont.load()
  .then(() => console.log('Local Font loaded successfully!'))
  .catch(error => console.error('Failed to load Local Font:', error));
```

**Configuration Options for Local Fonts:**

*   `localFontName` or `name`: (Required) The font family name you will use in your CSS rules (e.g., 'MyCustomFont'). Use either `localFontName` or `name`.
*   `localSrc` or `src`: (Required) The `@font-face src` value, including the URL to your font file and format hints. Example: `'url(/fonts/MyFont.woff2) format("woff2"), url(/fonts/MyFont.woff) format("woff")'`. Use either `localSrc` or `src`.
*   `weight` or `fontWeight`: (Optional) Font weight.
*   `style` or `fontStyle`: (Optional) Font style.
*   `display`: (Optional) `font-display` property. Defaults to `swap`.
*   Other `@font-face` properties (Optional): You can include any other valid `@font-face` properties directly in the `fontConfig` object (e.g., `unicode-range`, `font-stretch`).
*   `use`: (Optional) CSS class selector to apply the font.

### Custom/Self-Hosted Fonts

You can load custom fonts using three methods: providing a CSS URL, providing raw CSS rules, or defining `@font-face` properties directly.

**1. Loading via CSS URL:**

```javascript
const customFontByURL = new Font('custom', {
  url: '/css/my-custom-font.css' // URL to your CSS file containing @font-face rules
  // use: '.custom-text-url' // Optional: CSS class to apply the font
});

customFontByURL.load()
  .then(() => console.log('Custom Font (URL) loaded successfully!'))
  .catch(error => console.error('Failed to load Custom Font (URL):', error));
```

**Configuration Options (CSS URL):**

*   `url`: (Required) URL to a CSS file that contains the `@font-face` rules for your custom font.
*   `use`: (Optional) CSS class selector to apply the font.

**2. Loading via Raw CSS Rules:**

```javascript
const customFontByCSS = new Font('custom', {
  css: `@font-face {
      font-family: 'MySelfHostedFont';
      src: url('/fonts/MySelfHostedFont.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }`
  // use: '.custom-text-css' // Optional: CSS class to apply the font
});

customFontByCSS.load()
  .then(() => console.log('Custom Font (CSS) loaded successfully!'))
  .catch(error => console.error('Failed to load Custom Font (CSS):', error));
```

**Configuration Options (Raw CSS):**

*   `css`: (Required) A string containing the raw CSS rules, typically including `@font-face` declaration(s).
*   `use`: (Optional) CSS class selector to apply the font.

**3. Loading via `@font-face` Properties:**

```javascript
const customFontByProps = new Font('custom', {
  name: 'MySelfHostedFont', // Required: Font family name
  src: '/fonts/MySelfHostedFont.woff2', // Required: URL to the font file
  weight: 400, // Optional: Font weight
  style: 'normal', // Optional: Font style
  display: 'swap', // Optional: font-display
  // use: '.custom-text-props' // Optional: CSS class to apply the font
});

customFontByProps.load()
  .then(() => console.log('Custom Font (Properties) loaded successfully!'))
  .catch(error => console.error('Failed to load Custom Font (Properties):', error));
```

**Configuration Options (`@font-face` Properties):**

*   `name`: (Required) Font family name for the `@font-face` rule.
*   `src`: (Required) URL to the font file.
*   `weight` or `fontWeight`: (Optional) Font weight.
*   `style` or `fontStyle`: (Optional) Font style.
*   `display`: (Optional) `font-display` property. Defaults to `swap`.
*   Other `@font-face` properties (Optional): You can include any other valid `@font-face` properties directly in the `fontConfig` object (e.g., `unicode-range`, `font-stretch`).
*   `use`: (Optional) CSS class selector to apply the font.

## API Reference

### `constructor(providerName?, fontConfig)`

*   **`providerName` (optional):**  A string specifying the font provider. If not provided, the class attempts to detect the provider based on the `fontConfig`. Supported provider names (case-insensitive) and their aliases are:
    *   `google`, `go`, `g`
    *   `adobe`, `ad`, `a`, `typekit`, `type`, `kit`, `ty`, `tk`
    *   `font_awesome`, `font`, `wesome`, `fo`, `we`, `fw`
    *   `bunny`, `bun`, `bu`
    *   `fontshare`, `sh`, `fs`
    *   `local`, `lo`
    *   `custom`, `selfhosted`
*   **`fontConfig` (required):** An object containing configuration options specific to the chosen font provider. See the "Usage" section for details on configuration options for each provider.

### `load()`

*   Returns a `Promise` that resolves when the font is loaded successfully and rejects if there's an error during loading.

## Error Handling

The `load()` method returns a Promise that will reject if:

*   The specified `providerName` is not supported or cannot be detected.
*   Required configuration options for a provider are missing (e.g., font name for Google Fonts, project ID for Adobe Fonts).
*   There is an error loading the CSS file from a URL or injecting CSS rules.

You can use `.catch()` on the Promise returned by `load()` to handle errors and display user-friendly messages or implement fallback strategies.

## Applying Font Classes (`use` option)

The optional `use` configuration parameter allows you to automatically apply the loaded font to specific elements by creating and injecting a CSS class.

For example, if you set `use: '.my-text-class'` in your font configuration, the Font.js class will:

1.  Load the font.
2.  Create a CSS rule like:

    ```css
    .my-text-class {
      font-family: "Font Name", sans-serif; /* Font Name will be replaced with the actual font name */
      /* ... other font properties if configured (weight, style, display) ... */
    }
    ```

3.  Inject this CSS rule into the `<head>` of your document.

Now, you can simply add the class `my-text-class` to any HTML element to apply the loaded font.

**Important Notes about `use`:**

*   The `use` option creates a new `<style>` tag in the `<head>` with an ID based on the class name to avoid duplication if you load the same font multiple times with the same `use` class.
*   It sets `font-family`, and optionally `font-weight`, `font-style`, and `font-display` in the generated CSS rule based on your font configuration.
*   If you provide a class name starting with `.`, it will create a class-based CSS rule. If you provide a class name without `.`, it will add that class directly to the `<html>` element's `classList`.

## Contributing

Contributions are welcome! If you find bugs, have feature requests, or want to improve the code, please feel free to open issues or submit pull requests on [the repository link](https://github.com/sakibweb/Font-JS).

## License

[MIT License](https://github.com/sakibweb/Font-JS/blob/main/LICENSE)

---

This README provides comprehensive documentation for using the `Font.js` class. You can copy and paste this content into a `README.md` file in your project. Remember to replace placeholders like `your-adobe-project-id`, `your-fontshare-id`, font file paths, and the license information with your actual details.
