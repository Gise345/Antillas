// components/WelcomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CaymanTheme, JamaicaTheme, CaribbeanDesign, LocationTheme } from '@/constants/CaribbeanColors';

const { width, height } = Dimensions.get('window');

interface LocationCardProps {
  location: LocationTheme;
  name: string;
  subtitle: string;
  flag: string;
  onSelect: (location: LocationTheme) => void;
}

function LocationCard({ location, name, subtitle, flag, onSelect }: LocationCardProps) {
  const theme = location === 'cayman' ? CaymanTheme.light : JamaicaTheme.light;
  
  const handlePress = () => {
    console.log(`LocationCard pressed for: ${location}`); // Debug log
    Alert.alert(
      `Welcome to ${name}!`,
      `You've selected ${name}. The app will now show services and pricing for this location.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            console.log(`Confirming selection: ${location}`); // Debug log
            onSelect(location);
          }
        },
      ]
    );
  };
  
  return (
    <TouchableOpacity
      style={[styles.locationCard, { shadowColor: theme.shadow }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={theme.gradient as unknown as [string, string, ...string[]]}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.flag}>{flag}</Text>
          <Text style={styles.locationName}>{name}</Text>
          <Text style={styles.locationSubtitle}>{subtitle}</Text>
          
          <View style={[styles.selectButton, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
            <Text style={[styles.selectButtonText, { color: theme.primary }]}>
              Explore Services
            </Text>
            <Ionicons name="arrow-forward" size={16} color={theme.primary} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

interface WelcomeScreenProps {
  onLocationSelect: (location: LocationTheme) => void;
}

export default function WelcomeScreen({ onLocationSelect }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: '🏝️',
      title: 'Authentic Caribbean Excellence',
      description: 'Connect with skilled professionals who understand island life and culture'
    },
    {
      icon: '🤝',
      title: 'Trusted Community Network',
      description: 'Verified service providers with genuine reviews from your Caribbean neighbors'
    },
    {
      icon: '🌊',
      title: 'Island-Wide Coverage',
      description: 'From Cayman to Jamaica, find services across the beautiful Antilles'
    },
    {
      icon: '⚡',
      title: 'Modern Convenience',
      description: 'Book services with ease while respecting our island time culture'
    }
  ];

  const handleLocationSelect = (location: LocationTheme) => {
    console.log(`WelcomeScreen - Location selected: ${location}`); // Debug log
    onLocationSelect(location);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#0066CC', '#00AA44']}
        style={styles.backgroundGradient}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Antillas</Text>
              <Text style={styles.tagline}>Connecting Caribbean Excellence</Text>
            </View>
          </View>

          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>
              Welcome to the{'\n'}Heart of Caribbean Services
            </Text>
            <Text style={styles.welcomeDescription}>
              Discover trusted professionals across the Antilles. From skilled craftsmen to creative experts, 
              find the Caribbean excellence you need, when you need it.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Why Choose Antillas?</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              style={styles.featuresScroll}
            >
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Location Selection */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Choose Your Island</Text>
            <Text style={styles.locationDescription}>
              Select your location to discover local services and connect with your island community
            </Text>
            
            <View style={styles.locationCards}>
              <LocationCard
                location="cayman"
                name="Cayman Islands"
                subtitle="Professional paradise services"
                flag="🇰🇾"
                onSelect={handleLocationSelect}
              />
              
              <LocationCard
                location="jamaica"
                name="Jamaica"
                subtitle="Vibrant island expertise"
                flag="🇯🇲"
                onSelect={handleLocationSelect}
              />
            </View>
          </View>

          {/* Bottom CTA */}
          <View style={styles.bottomSection}>
            <Text style={styles.bottomText}>
              Join thousands of Caribbean professionals and customers building stronger island communities
            </Text>
            
            <TouchableOpacity style={styles.aiButton}>
              <Ionicons name="chatbubble-ellipses" size={20} color="white" />
              <Text style={styles.aiButtonText}>Ask Our AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: CaribbeanDesign.spacing.xl,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: CaribbeanDesign.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  welcomeSection: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    paddingVertical: CaribbeanDesign.spacing.xxl,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: CaribbeanDesign.spacing.lg,
    lineHeight: 40,
  },
  welcomeDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: CaribbeanDesign.spacing.md,
  },
  featuresSection: {
    paddingVertical: CaribbeanDesign.spacing.xl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: CaribbeanDesign.spacing.lg,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  featuresScroll: {
    paddingLeft: CaribbeanDesign.spacing.lg,
  },
  featureCard: {
    width: width * 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: CaribbeanDesign.borderRadius.xl,
    padding: CaribbeanDesign.spacing.xl,
    marginRight: CaribbeanDesign.spacing.lg,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: CaribbeanDesign.spacing.md,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: CaribbeanDesign.spacing.sm,
  },
  featureDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  locationSection: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    paddingVertical: CaribbeanDesign.spacing.xl,
  },
  locationDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: CaribbeanDesign.spacing.xl,
    lineHeight: 24,
  },
  locationCards: {
    gap: CaribbeanDesign.spacing.lg,
  },
  locationCard: {
    borderRadius: CaribbeanDesign.borderRadius.xl,
    overflow: 'hidden',
    ...CaribbeanDesign.shadows.lg,
  },
  cardGradient: {
    padding: CaribbeanDesign.spacing.xl,
  },
  cardContent: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 48,
    marginBottom: CaribbeanDesign.spacing.md,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: CaribbeanDesign.spacing.xs,
    textAlign: 'center',
  },
  locationSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: CaribbeanDesign.spacing.lg,
    textAlign: 'center',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CaribbeanDesign.spacing.md,
    paddingHorizontal: CaribbeanDesign.spacing.xl,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.sm,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    paddingVertical: CaribbeanDesign.spacing.xl,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: CaribbeanDesign.spacing.xl,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: CaribbeanDesign.spacing.md,
    paddingHorizontal: CaribbeanDesign.spacing.xl,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  aiButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});