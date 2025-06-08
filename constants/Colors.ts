/**
 * Carib Trade Hub Color System
 * Location-specific color palettes inspired by flag colors
 */

// Cayman Islands Flag Colors (vibrant interpretation)
export const CaymanColors = {
  primary: '#1E40AF',        // Royal Blue
  secondary: '#3B82F6',      // Bright Blue
  accent: '#60A5FA',         // Light Blue
  background: '#F0F8FF',     // Alice Blue
  surface: '#FFFFFF',
  surfaceVariant: '#E0F2FE',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onSurface: '#1E293B',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  gradient: ['#1E40AF', '#3B82F6', '#60A5FA'],
  shadowColor: '#1E40AF20',
};

// Jamaica Flag Colors (vibrant interpretation)
export const JamaicaColors = {
  primary: '#16A34A',        // Green
  secondary: '#FCD34D',      // Gold/Yellow
  accent: '#1F2937',         // Black
  background: '#F0FDF4',     // Light Green
  surface: '#FFFFFF',
  surfaceVariant: '#ECFDF5',
  onPrimary: '#FFFFFF',
  onSecondary: '#1F2937',
  onSurface: '#1F2937',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#16A34A',
  gradient: ['#16A34A', '#FCD34D', '#1F2937'],
  shadowColor: '#16A34A20',
};

// Shared/Common Colors
export const CommonColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
};

// Location type
export type LocationTheme = 'cayman' | 'jamaica';

// Theme selector function
export const getLocationTheme = (location: LocationTheme) => {
  return location === 'cayman' ? CaymanColors : JamaicaColors;
};

// Updated Colors constant for compatibility with existing code
export const Colors = {
  light: {
    text: CommonColors.gray[900],
    background: CommonColors.white,
    tint: CaymanColors.primary,
    icon: CommonColors.gray[600],
    tabIconDefault: CommonColors.gray[500],
    tabIconSelected: CaymanColors.primary,
    cayman: CaymanColors,
    jamaica: JamaicaColors,
  },
  dark: {
    text: CommonColors.gray[100],
    background: CommonColors.gray[900],
    tint: CaymanColors.accent,
    icon: CommonColors.gray[400],
    tabIconDefault: CommonColors.gray[500],
    tabIconSelected: CaymanColors.accent,
    cayman: {
      ...CaymanColors,
      background: CommonColors.gray[900],
      surface: CommonColors.gray[800],
      onSurface: CommonColors.gray[100],
    },
    jamaica: {
      ...JamaicaColors,
      background: CommonColors.gray[900],
      surface: CommonColors.gray[800],
      onSurface: CommonColors.gray[100],
    },
  },
};

// Typography Scale
export const Typography = {
  heading1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  heading2: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  heading3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  heading4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

// Spacing Scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border Radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: CommonColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: CommonColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: CommonColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};