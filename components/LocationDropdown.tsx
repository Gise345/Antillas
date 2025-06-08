// File: C:\CaribTradeHub\components\LocationDropdown.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocation, useLocationTheme } from '@/contexts/LocationContext';
import { CaymanColors, JamaicaColors, Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface LocationOptionProps {
  location: 'cayman' | 'jamaica';
  name: string;
  flag: string;
  isSelected: boolean;
  onSelect: () => void;
}

function LocationOption({ location, name, flag, isSelected, onSelect }: LocationOptionProps) {
  const colors = location === 'cayman' ? CaymanColors : JamaicaColors;
  
  return (
    <TouchableOpacity
      style={[
        styles.locationOption,
        { 
          backgroundColor: isSelected ? colors.primary + '10' : 'white',
          borderColor: isSelected ? colors.primary : CommonColors.gray[200],
        }
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={isSelected ? [colors.primary + '20', colors.secondary + '20'] : ['transparent', 'transparent']}
        style={styles.optionGradient}
      >
        <Text style={styles.locationFlag}>{flag}</Text>
        <View style={styles.locationInfo}>
          <Text style={[
            styles.locationName, 
            { color: isSelected ? colors.primary : CommonColors.gray[800] }
          ]}>
            {name}
          </Text>
          {isSelected && (
            <Text style={[styles.selectedText, { color: colors.primary }]}>
              Currently Selected
            </Text>
          )}
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

interface LocationDropdownProps {
  onLocationChange?: () => void;
}

export default function LocationDropdown({ onLocationChange }: LocationDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { currentLocation, setLocation, showLocationSelector } = useLocation();
  const { colors } = useLocationTheme();
  
  const locationData = {
    cayman: { name: 'Cayman Islands', flag: '🇰🇾' },
    jamaica: { name: 'Jamaica', flag: '🇯🇲' },
  };

  const handleLocationSelect = (location: 'cayman' | 'jamaica') => {
    setLocation(location);
    setIsVisible(false);
    onLocationChange?.();
  };

  const handleShowSelector = () => {
    setIsVisible(false);
    showLocationSelector();
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.dropdownTrigger}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.locationText}>
          {locationData[currentLocation].flag} {locationData[currentLocation].name}
        </Text>
        <Ionicons name="chevron-down" size={16} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
                Select Location
              </Text>
              <TouchableOpacity 
                onPress={() => setIsVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={CommonColors.gray[600]} />
              </TouchableOpacity>
            </View>

            <View style={styles.locationsContainer}>
              <LocationOption
                location="cayman"
                name="Cayman Islands"
                flag="🇰🇾"
                isSelected={currentLocation === 'cayman'}
                onSelect={() => handleLocationSelect('cayman')}
              />
              
              <LocationOption
                location="jamaica"
                name="Jamaica"
                flag="🇯🇲"
                isSelected={currentLocation === 'jamaica'}
                onSelect={() => handleLocationSelect('jamaica')}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.selectorButton]}
                onPress={handleShowSelector}
                activeOpacity={0.8}
              >
                <Ionicons name="location-outline" size={20} color={colors.primary} />
                <Text style={[styles.selectorButtonText, { color: colors.primary }]}>
                  Show Location Selector
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  locationText: {
    ...Typography.body1,
    color: 'white',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
    ...Shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    ...Typography.heading3,
    fontWeight: '600',
  },
  closeButton: {
    padding: Spacing.xs,
  },
  locationsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  locationOption: {
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  locationFlag: {
    fontSize: 32,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    ...Typography.heading4,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  selectedText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  modalActions: {
    borderTopWidth: 1,
    borderTopColor: CommonColors.gray[200],
    paddingTop: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  selectorButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: CommonColors.gray[300],
  },
  selectorButtonText: {
    ...Typography.button,
    fontWeight: '500',
  },
});