// Test setup for CSS property-based testing
const fs = require('fs');
const path = require('path');

// Load CSS content for testing
global.loadCSS = () => {
  const cssPath = path.join(__dirname, 'style.css');
  return fs.readFileSync(cssPath, 'utf8');
};

// Helper to parse CSS custom properties
global.parseCSSCustomProperties = (cssContent) => {
  const customProperties = {};
  const rootRuleMatch = cssContent.match(/:root\s*{([^}]*)}/s);
  
  if (rootRuleMatch) {
    const rootContent = rootRuleMatch[1];
    const propertyMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g);
    
    for (const match of propertyMatches) {
      const propertyName = match[1].trim();
      const propertyValue = match[2].trim();
      customProperties[propertyName] = propertyValue;
    }
  }
  
  return customProperties;
};

// Helper to validate color values
global.isValidColor = (value) => {
  // Check for hex colors
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) return true;
  
  // Check for rgba/rgb colors
  if (/^rgba?\([^)]+\)$/.test(value)) return true;
  
  // Check for CSS variables
  if (/^var\(--[^)]+\)$/.test(value)) return true;
  
  // Check for CSS color keywords
  const colorKeywords = ['transparent', 'inherit', 'initial', 'unset'];
  if (colorKeywords.includes(value.toLowerCase())) return true;
  
  return false;
};

// Helper to validate spacing values
global.isValidSpacing = (value) => {
  // Check for rem, px, em, %, vw, vh units
  return /^-?\d*\.?\d+(rem|px|em|%|vw|vh)$/.test(value);
};

// Helper to validate font size values
global.isValidFontSize = (value) => {
  // Check for rem, px, em units or clamp() function
  return /^(\d*\.?\d+(rem|px|em)|clamp\([^)]+\))$/.test(value);
};

// Helper to validate animation duration
global.isValidDuration = (value) => {
  return /^\d+ms$/.test(value);
};

// Helper to validate easing functions
global.isValidEasing = (value) => {
  return /^(ease|ease-in|ease-out|ease-in-out|linear|cubic-bezier\([^)]+\))$/.test(value);
};