/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{tsx,jsx,js,ts}'
  ],
  theme: {
    extend:{
      colors:{
        primary:'rgb(26 35 46/1)',
        secondary:'#27ae60'
      }
    },
  },
  plugins: [],
}

