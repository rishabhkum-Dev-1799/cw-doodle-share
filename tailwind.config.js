/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{tsx,jsx,js,ts}'
  ],
  theme: {
    extend:{
      colors:{
        primary:'#34495e',
        secondary:'#27ae60'
      }
    },
  },
  plugins: [],
}

