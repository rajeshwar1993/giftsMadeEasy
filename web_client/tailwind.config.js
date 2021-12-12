function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          primary: withOpacity('--color-text-primary'),
          accent: withOpacity('--color-text-accent'),
          disbaled: withOpacity('--color-text-disabled'),
          inverted: withOpacity('--color-text-inverted')
        }
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          accent: withOpacity('--color-fill-accent'),
          'accent-hover': withOpacity('--color-fill-accent-hover'),
          disbaled: withOpacity('--color-fill-disabled')
        }
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity('--color-fill')
        }
      },
      borderColor: {
        skin: {
          primary: withOpacity('--color-border-primary'),
          accent: withOpacity('--color-border-accent')
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
};
