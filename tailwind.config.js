/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                black: 'var(--color-black)',
                dark: 'var(--color-dark)',
                background: 'var(--color-background)',
            },
        },
    },
    plugins: [],
};

