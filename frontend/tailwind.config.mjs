/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "390px",
        xsm: "500px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        mac: "1440px",
        hd: "1536px",
        fullhd: "1920px",
      },
      fontFamily: {
        Nobile: ["Nobile", "sans-serif"],
        Muli: ["Muli", "sans-serif"],
      },
    },
  },
  plugins: [],
};
