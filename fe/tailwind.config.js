/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
            },
            colors: {
                'back-grey': '#242424',
                'text-white': '#EAE8FF',
                'button-grey': '#ADACB5',
                'button-grey-hover': '#94939F',
            }
        },
    },
    plugins: [],
};