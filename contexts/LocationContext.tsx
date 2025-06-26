// contexts/LocationContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationTheme, getLocationTheme } from '@/constants/CaribbeanColors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface LocationContextType {
  currentLocation: LocationTheme;
  setLocation: (location: LocationTheme) => Promise<void>;
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
    console.log('Setting location to:', location); // Debug log
    setCurrentLocation(location);
    setIsLocationSelected(true);
    
    // Persist location selection
    try {
      await AsyncStorage.setItem('selectedLocation', location);
      await AsyncStorage.setItem('locationSelected', 'true');
      console.log('Location saved to storage:', location); // Debug log
    } catch (error) {
      console.log('Error saving location:', error);
    }
  };

  const showLocationSelector = () => {
    setIsLocationSelected(false);
  };

  const resetLocationSelection = async () => {
    setIsLocationSelected(false);
    try {
      await AsyncStorage.removeItem('selectedLocation');
      await AsyncStorage.removeItem('locationSelected');
    } catch (error) {
      console.log('Error clearing location:', error);
    }
  };

  // Load saved location on app start
  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('selectedLocation');
        const locationSelected = await AsyncStorage.getItem('locationSelected');
        
        console.log('Loaded from storage - Location:', savedLocation, 'Selected:', locationSelected); // Debug log
        
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
  const colorScheme = useColorScheme();
  
  console.log('useLocationTheme - Current location:', currentLocation); // Debug log
  
  return {
    colors: getLocationTheme(currentLocation, colorScheme || 'light'),
    location: currentLocation,
  };
}