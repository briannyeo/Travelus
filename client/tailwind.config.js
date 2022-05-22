module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#64bce1",
      purple: "#7e5bef",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#6419E6",

  //         secondary: "#D926A9",

  //         accent: "#1FB2A6",

  //         neutral: "#191D24",

  //         "base-100": "#2A303C",

  //         info: "#3ABFF8",

  //         success: "#36D399",

  //         warning: "#FBBD23",

  //         error: "#F87272",
  //       },
  //     },
  //   ],
  // },
  // plugins: [require("daisyui")],
};
