import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '@/contexts/LocationContext';
import { CaymanColors, JamaicaColors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface LocationCardProps {
  title: string;
  subtitle: string;
  colors: typeof CaymanColors;
  onPress: () => void;
  flag: string;
}

function LocationCard({ title, subtitle, colors, onPress, flag }: LocationCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { shadowColor: colors.shadowColor }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={colors.gradient as [string, string, ...string[]]}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.flag}>{flag}</Text>
          <Text style={[styles.cardTitle, { color: colors.onPrimary }]}>{title}</Text>
          <Text style={[styles.cardSubtitle, { color: colors.onPrimary }]}>{subtitle}</Text>
          <View style={[styles.selectButton, { backgroundColor: colors.onPrimary }]}>
            <Text style={[styles.selectButtonText, { color: colors.primary }]}>
              Select Location
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function LocationSelectorScreen() {
  const { setLocation } = useLocation();

  const handleLocationSelect = (location: 'cayman' | 'jamaica') => {
    setLocation(location);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#1E40AF', '#16A34A']}
        style={styles.background}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.appName}>Carib Trade Hub</Text>
            <Text style={styles.description}>
              Your trusted marketplace for professional services across the Caribbean
            </Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.sectionTitle}>Choose Your Location</Text>
            
            <View style={styles.cardsContainer}>
              <LocationCard
                title="Cayman Islands"
                subtitle="Professional services in paradise"
                colors={CaymanColors}
                flag="🇰🇾"
                onPress={() => handleLocationSelect('cayman')}
              />
              
              <LocationCard
                title="Jamaica"
                subtitle="Discover skilled professionals"
                colors={JamaicaColors}
                flag="🇯🇲"
                onPress={() => handleLocationSelect('jamaica')}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              You can always change your location later in settings
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xl,
  },
  title: {
    ...Typography.heading2,
    color: 'white',
    opacity: 0.9,
    marginBottom: Spacing.xs,
  },
  appName: {
    ...Typography.heading1,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body1,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    ...Typography.heading3,
    color: 'white',
    textAlign: 'center',
    marginBottom: Spacing.xl,
    fontWeight: '600',
  },
  cardsContainer: {
    gap: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  cardGradient: {
    padding: Spacing.xl,
    minHeight: 180,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    ...Typography.heading3,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  cardSubtitle: {
    ...Typography.body1,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  selectButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    minWidth: 160,
  },
  selectButtonText: {
    ...Typography.button,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  footerText: {
    ...Typography.caption,
    color: 'white',
    opacity: 0.7,
    textAlign: 'center',
  },
});