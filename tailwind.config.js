/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            violet: {
                white: colors.violet[50],
                light: colors.violet[400],
                DEFAULT: colors.violet[800],
                dark: colors.violet[900],
            },
            red: {
                DEFAULT: colors.red[600],
            },
            green: {
                white: colors.green[50],
                light: colors.green[300],
                DEFAULT: colors.green[500],
                dark: colors.green[700],
            },
        },
        container: {
            center: true,
        },
        extend: {
            backgroundImage: {
                'light-gradient':
                    'linear-gradient(95deg, rgba(196,181,253,1) 0%, rgba(245,208,254,1) 100%)',
            },
            fontSize: {
                h1: ['3.3rem', { lineHeight: 1 }],
                h2: defaultTheme.fontSize['6xl'],
                h3: defaultTheme.fontSize['4xl'],
                h4: defaultTheme.fontSize['3xl'],
                h5: defaultTheme.fontSize['2xl'],
                h6: defaultTheme.fontSize['xl'],
            },
        },
    },
    plugins: [],
}
