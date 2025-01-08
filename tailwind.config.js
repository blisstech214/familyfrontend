/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorA: "#0d6dff",
        colorBg:"#e6eef7",
        ab:"#3f7fca19"
      },
      fontFamily: {
        head1: ["Grey Qo"],
      },
    },
  },
  plugins: [],
};
