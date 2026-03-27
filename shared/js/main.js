// main.js
import { enumerateExamples } from "./examples.js";
import { initPrintButton } from "./printButton.js";

// Configure MathJax before it loads
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
        fontCache: 'global'
    }
};

// Dynamically load MathJax
function loadMathJax() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
    // Load MathJax
    loadMathJax();

    // Start at 1; customize by page with data-example-start on <body> if you like
    const startAttr = document.body.getAttribute("data-example-start");
    const start = startAttr ? parseInt(startAttr, 10) : 1;

    enumerateExamples({
        start,
        selector: ".example",
        headerSelector: ".example__header",
        numberSelector: ".example-number__index",
    });

    initPrintButton();
});