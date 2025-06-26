// screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CaymanTheme, JamaicaTheme, CaribbeanDesign, ServiceCategoryColors, LocationTheme } from '@/constants/CaribbeanColors';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  location: LocationTheme;
  onLocationChange: () => void;
  onOpenAISearch: () => void;
  onOpenBooking: (providerId: string) => void;
}

interface ServiceCategoryProps {
  icon: string;
  title: string;
  count: string;
  color: string;
  onPress: () => void;
}

interface FeaturedProviderProps {
  id: string;
  name: string;
  service: string;
  rating: number;
  image: string;
  isVerified: boolean;
  isOnline: boolean;
  location: string;
}

function ServiceCategory({ icon, title, count, color, onPress }: ServiceCategoryProps) {
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={[styles.categoryCount, { color }]}>{count} services</Text>
    </TouchableOpacity>
  );
}

function FeaturedProvider({ name, service, rating, image, isVerified, isOnline, location }: FeaturedProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<LocationTheme>('cayman');
  const theme = currentTheme === 'cayman' ? CaymanTheme.light : JamaicaTheme.light;
  
  return (
    <TouchableOpacity style={[styles.providerCard, { backgroundColor: theme.surface }]} activeOpacity={0.8}>
      <View style={styles.providerHeader}>
        <View style={styles.providerImageContainer}>
          <Image source={{ uri: image }} style={styles.providerImage} />
          {isOnline && <View style={[styles.onlineIndicator, { backgroundColor: theme.success }]} />}
          {isVerified && (
            <View style={[styles.verifiedBadge, { backgroundColor: theme.primary }]}>
              <Ionicons name="checkmark" size={12} color="white" />
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.providerInfo}>
        <Text style={[styles.providerName, { color: theme.text }]} numberOfLines={1}>{name}</Text>
        <Text style={[styles.providerService, { color: theme.primary }]} numberOfLines={1}>{service}</Text>
        
        <View style={styles.providerStats}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.rating, { color: theme.text }]}>{rating}</Text>
          </View>
          <Text style={[styles.providerLocation, { color: theme.textSecondary }]} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ location, onLocationChange, onOpenAISearch, onOpenBooking }: HomeScreenProps) {
  const theme = location === 'cayman' ? CaymanTheme.light : JamaicaTheme.light;
  const [searchQuery, setSearchQuery] = useState('');
  
  const locationData = {
    cayman: { name: 'Cayman Islands', flag: '🇰🇾', greeting: 'Welcome to Paradise' },
    jamaica: { name: 'Jamaica', flag: '🇯🇲', greeting: 'Welcome to Yaad' },
  };

  const serviceCategories = [
    { icon: 'home-outline', title: 'Home Services', count: '150+', color: ServiceCategoryColors.home },
    { icon: 'car-outline', title: 'Automotive', count: '89+', color: ServiceCategoryColors.automotive },
    { icon: 'briefcase-outline', title: 'Professional', count: '120+', color: ServiceCategoryColors.professional },
    { icon: 'construct-outline', title: 'Construction', count: '95+', color: ServiceCategoryColors.creative },
    { icon: 'camera-outline', title: 'Creative', count: '67+', color: ServiceCategoryColors.events },
    { icon: 'fitness-outline', title: 'Health & Wellness', count: '78+', color: ServiceCategoryColors.health },
    { icon: 'restaurant-outline', title: 'Food & Catering', count: '45+', color: ServiceCategoryColors.food },
    { icon: 'boat-outline', title: 'Marine Services', count: '32+', color: ServiceCategoryColors.marine },
  ];

  const featuredProviders: FeaturedProviderProps[] = [
    {
      id: '1',
      name: 'Marcus Johnson',
      service: 'Master Plumber',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isVerified: true,
      isOnline: true,
      location: location === 'cayman' ? 'George Town' : 'Kingston',
    },
    {
      id: '2',
      name: 'Sarah Williams',
      service: 'Interior Designer',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=150&h=150&fit=crop&crop=face',
      isVerified: true,
      isOnline: false,
      location: location === 'cayman' ? 'Seven Mile Beach' : 'Montego Bay',
    },
    {
      id: '3',
      name: 'David Brown',
      service: 'Auto Mechanic',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isVerified: false,
      isOnline: true,
      location: location === 'cayman' ? 'West Bay' : 'Spanish Town',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={theme.gradient as [string, string, ...string[]]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.locationSelector} onPress={onLocationChange}>
            <Text style={styles.locationFlag}>{locationData[location].flag}</Text>
            <View>
              <Text style={styles.locationName}>{locationData[location].name}</Text>
              <Text style={styles.locationGreeting}>{locationData[location].greeting}</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.welcomeText}>Find trusted professionals in your community</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={theme.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services or ask our AI assistant..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={[styles.aiButton, { backgroundColor: theme.accent }]} onPress={onOpenAISearch}>
              <Ionicons name="chatbubble-ellipses" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.primary }]}>
              <Ionicons name="flash" size={20} color="white" />
              <Text style={styles.quickActionText}>Urgent Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.secondary }]}>
              <Ionicons name="calendar" size={20} color="white" />
              <Text style={styles.quickActionText}>Schedule Later</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Services</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesScroll}
          >
            {serviceCategories.map((category, index) => (
              <ServiceCategory
                key={index}
                icon={category.icon}
                title={category.title}
                count={category.count}
                color={category.color}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Providers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Top Rated Professionals</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredProviders.map((provider) => (
              <TouchableOpacity 
                key={provider.id} 
                onPress={() => onOpenBooking(provider.id)}
                activeOpacity={0.8}
              >
                <FeaturedProvider {...provider} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Caribbean Spotlight */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Caribbean Spotlight</Text>
          </View>
          
          <View style={[styles.spotlightCard, { backgroundColor: theme.surface }]}>
            <LinearGradient
              colors={[theme.primary + '20', theme.secondary + '20']}
              style={styles.spotlightGradient}
            >
              <View style={styles.spotlightContent}>
                <View style={styles.spotlightIcon}>
                  <Text style={styles.spotlightEmoji}>🏝️</Text>
                </View>
                <View style={styles.spotlightText}>
                  <Text style={[styles.spotlightTitle, { color: theme.text }]}>
                    Supporting Local Caribbean Businesses
                  </Text>
                  <Text style={[styles.spotlightDescription, { color: theme.textSecondary }]}>
                    Every service booked helps strengthen our island communities and keeps Caribbean talent thriving at home.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Recent Activity</Text>
          
          <View style={[styles.activityCard, { backgroundColor: theme.surface }]}>
            <View style={styles.activityHeader}>
              <View style={[styles.activityIcon, { backgroundColor: theme.success + '20' }]}>
                <Ionicons name="checkmark-circle" size={20} color={theme.success} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={[styles.activityTitle, { color: theme.text }]}>
                  Service Completed
                </Text>
                <Text style={[styles.activityDescription, { color: theme.textSecondary }]}>
                  Plumbing repair by Marcus Johnson • 2 days ago
                </Text>
              </View>
              <TouchableOpacity style={[styles.reviewButton, { backgroundColor: theme.primary + '20' }]}>
                <Text style={[styles.reviewButtonText, { color: theme.primary }]}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: CaribbeanDesign.spacing.md,
    paddingBottom: CaribbeanDesign.spacing.xl,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    borderBottomLeftRadius: CaribbeanDesign.borderRadius.xl,
    borderBottomRightRadius: CaribbeanDesign.borderRadius.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: CaribbeanDesign.spacing.lg,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.sm,
  },
  locationFlag: {
    fontSize: 24,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  locationGreeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.md,
  },
  headerButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 32,
    height: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: CaribbeanDesign.spacing.lg,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: CaribbeanDesign.spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: CaribbeanDesign.borderRadius.lg,
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.md,
    gap: CaribbeanDesign.spacing.md,
    ...CaribbeanDesign.shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A202C',
  },
  aiButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingTop: CaribbeanDesign.spacing.lg,
  },
  section: {
    marginBottom: CaribbeanDesign.spacing.xl,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  lastSection: {
    marginBottom: CaribbeanDesign.spacing.xxl * 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: CaribbeanDesign.spacing.md,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CaribbeanDesign.spacing.md,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.sm,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: CaribbeanDesign.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesScroll: {
    marginLeft: -CaribbeanDesign.spacing.lg,
    paddingLeft: CaribbeanDesign.spacing.lg,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: CaribbeanDesign.spacing.md,
    width: 85,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CaribbeanDesign.spacing.sm,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
    color: '#1A202C',
  },
  categoryCount: {
    fontSize: 10,
    fontWeight: '500',
  },
  providerCard: {
    width: 180,
    padding: CaribbeanDesign.spacing.md,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    marginRight: CaribbeanDesign.spacing.md,
    ...CaribbeanDesign.shadows.sm,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: CaribbeanDesign.spacing.md,
  },
  providerImageContainer: {
    position: 'relative',
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    padding: 4,
  },
  providerInfo: {
    gap: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  providerService: {
    fontSize: 14,
    fontWeight: '500',
  },
  providerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
  },
  providerLocation: {
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },
  spotlightCard: {
    borderRadius: CaribbeanDesign.borderRadius.lg,
    overflow: 'hidden',
    ...CaribbeanDesign.shadows.sm,
  },
  spotlightGradient: {
    padding: CaribbeanDesign.spacing.lg,
  },
  spotlightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.md,
  },
  spotlightIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotlightEmoji: {
    fontSize: 32,
  },
  spotlightText: {
    flex: 1,
    gap: 4,
  },
  spotlightTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  spotlightDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  activityCard: {
    borderRadius: CaribbeanDesign.borderRadius.lg,
    padding: CaribbeanDesign.spacing.md,
    ...CaribbeanDesign.shadows.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 12,
  },
  reviewButton: {
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.sm,
    borderRadius: CaribbeanDesign.borderRadius.sm,
  },
  reviewButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});