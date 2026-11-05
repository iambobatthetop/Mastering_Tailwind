const menu = document.querySelector('#menu');
const burger = document.querySelector('#burger');
const burgerIcon = burger?.querySelector('img');
const themeToggle = document.querySelector('#theme-toggle');

const getThemeIcon = (darkMode) => {
    if (darkMode) {
        return `
            <svg class="block h-5 w-5 object-contain" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
            </svg>
        `;
    }

    return `
        <svg class="block h-5 w-5 object-contain" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="4.5" stroke-linecap="round" stroke-linejoin="round" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.35 5.65l-1.77 1.77M7.42 16.58l-1.77 1.77M18.35 18.35l-1.77-1.77M7.42 7.42 5.65 5.65" />
        </svg>
    `;
};

const setTheme = (darkMode) => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch (error) {
        // Ignore storage failures in restricted environments.
    }

    if (themeToggle) {
        themeToggle.innerHTML = getThemeIcon(darkMode);
        themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.title = darkMode ? 'Switch to light mode' : 'Switch to dark mode';
    }
};

try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
} catch (error) {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

if (burger) {
    burger.addEventListener('click', () => {
        const isOpening = menu.classList.contains('hidden');
        menu.classList.toggle('hidden', !isOpening);
        menu.classList.toggle('flex', isOpening);
        burgerIcon.src = isOpening ? 'img/close.png' : 'img/menu.png';
    });
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(!isDark);
    });
}