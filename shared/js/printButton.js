// printButton.js
// Adds a print button to the bottom of the page that replaces .blanked spans
// with underscores for printing, with proper aria-label for screen readers.

function replaceBlanksForPrint() {
    document.querySelectorAll('.blanked').forEach(el => {
        const originalText = el.textContent.trim();
        const underscoreCount = Math.min(originalText.length, 10);
        const underscores = '__'.repeat(underscoreCount);

        el.setAttribute('data-original-html', el.innerHTML);
        el.setAttribute('aria-label', 'Blank');
        el.textContent = underscores;
        el.classList.add('print-underscore');
        el.style.whiteSpace = 'nowrap';

        const parentWidth = el.parentElement?.clientWidth ?? Infinity;
        if (el.clientWidth > parentWidth * 0.4) {
            el.style.display = 'block';
        }
    });

    document.querySelectorAll('.blank-space').forEach(el => {
        el.setAttribute('data-original-html', el.innerHTML);
        el.setAttribute('aria-label', 'Blank');
        el.textContent = '';
    });

    document.querySelectorAll('.solution').forEach(el => {
        el.setAttribute('data-original-html', el.innerHTML);
        el.innerHTML = '';
    });
}

function restoreOriginalText() {
    document.querySelectorAll('.blanked').forEach(el => {
        const originalHTML = el.getAttribute('data-original-html');
        if (originalHTML !== null) {
            el.innerHTML = originalHTML;
            el.removeAttribute('aria-label');
            el.removeAttribute('data-original-html');
            el.classList.remove('print-underscore');
            el.style.whiteSpace = '';
            el.style.display = '';
        }
    });

    document.querySelectorAll('.blank-space').forEach(el => {
        const originalHTML = el.getAttribute('data-original-html');
        if (originalHTML !== null) {
            el.innerHTML = originalHTML;
            el.removeAttribute('aria-label');
            el.removeAttribute('data-original-html');
        }
    });

    document.querySelectorAll('.solution').forEach(el => {
        const originalHTML = el.getAttribute('data-original-html');
        if (originalHTML !== null) {
            el.innerHTML = originalHTML;
            el.removeAttribute('data-original-html');
        }
    });
}

function addPrintStyles() {
    const style = document.createElement('style');
    style.id = 'printOverrides';
    style.textContent = `
        @media print {
            .dontprint {
                display: none !important;
            }
            .page-break {
                page-break-before: always !important;
            }
            .blanked {
                font-family: monospace;
                letter-spacing: 0.05em;
                color: black;
                border-bottom: none;
                height: auto;
                min-width: unset;
            }
        }
    `;
    document.head.appendChild(style);
}

function removePrintStyles() {
    document.getElementById('printOverrides')?.remove();
}

function createPrintButton(id) {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = id;
    button.textContent = 'Print Notes';
    button.classList.add('dontprint');

    button.addEventListener('click', () => {
        replaceBlanksForPrint();
        addPrintStyles();

        setTimeout(() => {
            window.print();
        }, 500);

        setTimeout(() => {
            removePrintStyles();
            restoreOriginalText();
        }, 1000);
    });

    return button;
}

export function initPrintButton() {
    document.body.insertAdjacentElement('afterbegin', createPrintButton('printNotes-top'));
    document.body.appendChild(createPrintButton('printNotes-bottom'));
}
