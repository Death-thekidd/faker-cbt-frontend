// custom-theme.ts
export const CustomTheme = {
  primitive: {
    borderRadius: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    emerald: { 500: '#10b981' }, // Customize as needed
    // Add other colors as needed
  },
  semantic: {
    primary: {
      500: '{emerald.500}',
      // Customize other shades if needed
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          100: '#f0f0f0',
          // Customize other shades
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '#34d399',
          // Customize other states
        },
        // Add other semantic styles
      },
      dark: {
        surface: {
          0: '#1e1e1e',
          // Customize dark theme colors
        },
        // Add other styles for dark mode
      },
    },
  },
};
