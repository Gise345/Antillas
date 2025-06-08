import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationTheme } from '../../contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ServiceCategoryProps {
  icon: string;
  title: string;
  count: string;
  onPress: () => void;
}

interface FeaturedProviderProps {
  name: string;
  service: string;
  rating: number;
  image: string;
  verified: boolean;
}

function ServiceCategory({ icon, title, count, onPress }: ServiceCategoryProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.categoryIcon, { backgroundColor: colors.background }]}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={[styles.categoryTitle, { color: colors.onSurface }]}>{title}</Text>
      <Text style={[styles.categoryCount, { color: colors.primary }]}>{count}</Text>
    </TouchableOpacity>
  );
}

function FeaturedProvider({ name, service, rating, image, verified }: FeaturedProviderProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity style={[styles.providerCard, { backgroundColor: colors.surface }]} activeOpacity={0.8}>
      <View style={styles.providerImageContainer}>
        <Image source={{ uri: image }} style={styles.providerImage} />
        {verified && (
          <View style={[styles.verifiedBadge, { backgroundColor: colors.success }]}>
            <Ionicons name="checkmark" size={12} color="white" />
          </View>
        )}
      </View>
      <View style={styles.providerInfo}>
        <Text style={[styles.providerName, { color: colors.onSurface }]}>{name}</Text>
        <Text style={[styles.providerService, { color: colors.primary }]}>{service}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FCD34D" />
          <Text style={[styles.rating, { color: colors.onSurface }]}>{rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { colors, location } = useLocationTheme();
  
  const locationName = location === 'cayman' ? 'Cayman Islands' : 'Jamaica';
  const locationFlag = location === 'cayman' ? '🇰🇾' : '🇯🇲';

  const categories = [
    { icon: 'home-outline', title: 'Home Services', count: '150+' },
    { icon: 'car-outline', title: 'Automotive', count: '89+' },
    { icon: 'briefcase-outline', title: 'Professional', count: '120+' },
    { icon: 'construct-outline', title: 'Construction', count: '95+' },
    { icon: 'camera-outline', title: 'Creative', count: '67+' },
    { icon: 'fitness-outline', title: 'Health & Wellness', count: '78+' },
  ];

  const featuredProviders = [
    {
      name: 'Marcus Johnson',
      service: 'Plumbing Services',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      verified: true,
    },
    {
      name: 'Sarah Williams',
      service: 'Interior Design',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=150',
      verified: true,
    },
    {
      name: 'David Brown',
      service: 'Auto Repair',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      verified: false,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={colors.gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {locationFlag} {locationName}
            </Text>
            <TouchableOpacity style={styles.changeLocationButton}>
              <Ionicons name="chevron-down" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.headerTitle}>Find trusted professionals</Text>
        </View>
        
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color={CommonColors.gray[500]} />
          <Text style={styles.searchPlaceholder}>Search services or ask AI...</Text>
          <Ionicons name="mic" size={20} color={colors.primary} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.primary }]}>
              <Ionicons name="flash" size={20} color="white" />
              <Text style={styles.quickActionText}>Urgent Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.secondary }]}>
              <Ionicons name="chatbox" size={20} color="white" />
              <Text style={styles.quickActionText}>Ask AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Browse Categories</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category, index) => (
              <ServiceCategory
                key={index}
                icon={category.icon}
                title={category.title}
                count={category.count}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Providers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Top Rated Providers</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredProviders.map((provider, index) => (
              <FeaturedProvider key={index} {...provider} />
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Recent Activity</Text>
          <View style={[styles.activityCard, { backgroundColor: colors.surface }]}>
            <View style={styles.activityIcon}>
              <Ionicons name="time" size={20} color={colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.onSurface }]}>
                Plumbing service completed
              </Text>
              <Text style={[styles.activityDescription, { color: CommonColors.gray[600] }]}>
                Marcus Johnson • Kitchen sink repair • 2 days ago
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={[styles.reviewButton, { color: colors.primary }]}>Review</Text>
            </TouchableOpacity>
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...Typography.body1,
    color: 'white',
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  changeLocationButton: {
    padding: Spacing.xs,
  },
  profileButton: {
    padding: Spacing.xs,
  },
  welcomeContainer: {
    marginBottom: Spacing.lg,
  },
  welcomeText: {
    ...Typography.body1,
    color: 'white',
    opacity: 0.9,
  },
  headerTitle: {
    ...Typography.heading2,
    color: 'white',
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  searchPlaceholder: {
    ...Typography.body1,
    color: CommonColors.gray[500],
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  lastSection: {
    marginBottom: Spacing.xxxl,
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  quickActionText: {
    ...Typography.body2,
    color: 'white',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading4,
    fontWeight: '600',
  },
  seeAll: {
    ...Typography.body2,
    fontWeight: '600',
  },
  categoriesScroll: {
    marginLeft: -Spacing.lg,
    paddingLeft: Spacing.lg,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: Spacing.md,
    width: 90,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  categoryTitle: {
    ...Typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  categoryCount: {
    ...Typography.caption,
    fontWeight: '500',
  },
  providerCard: {
    width: 160,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  providerImageContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  providerImage: {
    width: '100%',
    height: 80,
    borderRadius: BorderRadius.md,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerInfo: {
    gap: Spacing.xs,
  },
  providerName: {
    ...Typography.body2,
    fontWeight: '600',
  },
  providerService: {
    ...Typography.caption,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rating: {
    ...Typography.caption,
    fontWeight: '500',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: CommonColors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  activityTitle: {
    ...Typography.body2,
    fontWeight: '600',
  },
  activityDescription: {
    ...Typography.caption,
  },
  reviewButton: {
    ...Typography.body2,
    fontWeight: '600',
  },
});