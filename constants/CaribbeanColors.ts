// constants/CaribbeanColors.ts
/**
 * Caribbean-themed color palette inspired by Cayman Islands and Jamaica flags
 * Features vibrant, modern interpretations of flag colors
 */

// Cayman Islands Flag Colors (Blue, Red, White with modern vibrant twist)
export const CaymanTheme = {
  light: {
    primary: '#0066CC', // Vibrant blue from flag
    secondary: '#FF4444', // Modern red
    accent: '#00AAFF', // Bright sky blue
    background: '#F8FCFF', // Very light blue tint
    surface: '#FFFFFF',
    text: '#1A365D',
    textSecondary: '#4A5568',
    border: '#E2E8F0',
    success: '#38B2AC',
    warning: '#ED8936',
    error: '#E53E3E',
    gradient: ['#0066CC', '#00AAFF'],
    shadow: 'rgba(0, 102, 204, 0.1)',
  },
  dark: {
    primary: '#4299E1',
    secondary: '#FC8181',
    accent: '#63B3ED',
    background: '#0A1A2A',
    surface: '#1A2B3D',
    text: '#F7FAFC',
    textSecondary: '#CBD5E0',
    border: '#2D3748',
    success: '#4FD1C7',
    warning: '#F6AD55',
    error: '#FEB2B2',
    gradient: ['#4299E1', '#63B3ED'],
    shadow: 'rgba(66, 153, 225, 0.2)',
  }
};

// Jamaica Flag Colors (Green, Yellow, Black with vibrant modern twist)
export const JamaicaTheme = {
  light: {
    primary: '#00AA44', // Vibrant green from flag
    secondary: '#FFD700', // Bright gold/yellow
    accent: '#228B22', // Forest green
    background: '#F0FFF4', // Very light green tint
    surface: '#FFFFFF',
    text: '#1A202C',
    textSecondary: '#4A5568',
    border: '#E2E8F0',
    success: '#38B2AC',
    warning: '#ED8936',
    error: '#E53E3E',
    gradient: ['#00AA44', '#228B22'],
    shadow: 'rgba(0, 170, 68, 0.1)',
  },
  dark: {
    primary: '#48BB78',
    secondary: '#F6E05E',
    accent: '#68D391',
    background: '#0A1A0F',
    surface: '#1A2B1F',
    text: '#F7FAFC',
    textSecondary: '#CBD5E0',
    border: '#2D3748',
    success: '#4FD1C7',
    warning: '#F6AD55',
    error: '#FEB2B2',
    gradient: ['#48BB78', '#68D391'],
    shadow: 'rgba(72, 187, 120, 0.2)',
  }
};

// Location-based theme selector
export type LocationTheme = 'cayman' | 'jamaica';

export const getLocationTheme = (location: LocationTheme, colorScheme: 'light' | 'dark') => {
  return location === 'cayman' ? CaymanTheme[colorScheme] : JamaicaTheme[colorScheme];
};

// Common Caribbean design tokens
export const CaribbeanDesign = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' as const, lineHeight: 40 },
    h2: { fontSize: 28, fontWeight: 'bold' as const, lineHeight: 36 },
    h3: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
    h4: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
    body: { fontSize: 16, fontWeight: 'normal' as const, lineHeight: 24 },
    bodyLarge: { fontSize: 18, fontWeight: 'normal' as const, lineHeight: 26 },
    caption: { fontSize: 14, fontWeight: 'normal' as const, lineHeight: 20 },
    small: { fontSize: 12, fontWeight: 'normal' as const, lineHeight: 18 },
  },
  shadows: {
    sm: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Service category colors (consistent across both locations)
export const ServiceCategoryColors = {
  home: '#FF6B6B',
  automotive: '#4ECDC4',
  professional: '#45B7D1',
  creative: '#96CEB4',
  events: '#FFEAA7',
  health: '#DDA0DD',
  food: '#98D8C8',
  transportation: '#A29BFE',
  education: '#74B9FF',
  tourism: '#FD79A8',
  rental: '#FDCB6E',
  agriculture: '#6C5CE7',
  marine: '#00B894',
  emergency: '#E17055',
};