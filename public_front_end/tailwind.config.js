function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          primary: withOpacity('--color-text-primary'),
          accent: withOpacity('--color-text-accent'),
          disbaled: withOpacity('--color-text-disabled'),
          inverted: withOpacity('--color-text-inverted'),
          error: withOpacity('--color-text-error')
        }
      },
      backgroundColor: {
        skin: {
          'fill-card': withOpacity('--color-fill-card'),
          'fill-hover': withOpacity('--color-fill-hover'),
          'fill-accent-hover': withOpacity('--color-fill-accent-hover'),
          fill: withOpacity('--color-fill'),
          accent: withOpacity('--color-fill-accent'),
          inverted: withOpacity('--color-fill-inverted'),
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
          accent: withOpacity('--color-border-accent'),
          inverted: withOpacity('--color-border-inverted')
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};
