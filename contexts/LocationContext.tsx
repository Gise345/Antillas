import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LocationTheme } from '@/constants/Colors';

interface LocationContextType {
  currentLocation: LocationTheme;
  setLocation: (location: LocationTheme) => void;
  isLocationSelected: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationTheme>('cayman');
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const setLocation = (location: LocationTheme) => {
    setCurrentLocation(location);
    setIsLocationSelected(true);
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setLocation,
        isLocationSelected,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

// Custom hook for getting location-specific theme colors
export function useLocationTheme() {
  const { currentLocation } = useLocation();
  const { Colors, getLocationTheme } = require('@/constants/Colors');
  
  return {
    colors: getLocationTheme(currentLocation),
    location: currentLocation,
  };
}