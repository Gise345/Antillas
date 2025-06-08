import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationTheme } from '@/constants/Colors';

interface LocationContextType {
  currentLocation: LocationTheme;
  setLocation: (location: LocationTheme) => void;
  isLocationSelected: boolean;
  showLocationSelector: () => void;
  resetLocationSelection: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationTheme>('cayman');
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const setLocation = async (location: LocationTheme) => {
    setCurrentLocation(location);
    setIsLocationSelected(true);
    // Persist location selection
    await AsyncStorage.setItem('selectedLocation', location);
    await AsyncStorage.setItem('locationSelected', 'true');
  };

  const showLocationSelector = () => {
    setIsLocationSelected(false);
  };

  const resetLocationSelection = async () => {
    setIsLocationSelected(false);
    await AsyncStorage.removeItem('selectedLocation');
    await AsyncStorage.removeItem('locationSelected');
  };

  // Load saved location on app start
  React.useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('selectedLocation');
        const locationSelected = await AsyncStorage.getItem('locationSelected');
        
        if (savedLocation && locationSelected === 'true') {
          setCurrentLocation(savedLocation as LocationTheme);
          setIsLocationSelected(true);
        }
      } catch (error) {
        console.log('Error loading saved location:', error);
      }
    };
    
    loadSavedLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setLocation,
        isLocationSelected,
        showLocationSelector,
        resetLocationSelection,
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