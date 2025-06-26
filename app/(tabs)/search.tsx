// app/(tabs)/search.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocationTheme } from '@/contexts/LocationContext';
import { CaribbeanDesign, ServiceCategoryColors } from '@/constants/CaribbeanColors';
import AISearchScreen from '@/components/AISearchScreen';

interface ServiceCategoryProps {
  icon: string;
  title: string;
  count: string;
  color: string;
  onPress: () => void;
}

interface QuickFilterProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

function ServiceCategory({ icon, title, count, color, onPress }: ServiceCategoryProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: colors.surface }]} onPress={onPress}>
      <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.categoryCount, { color }]}>{count}</Text>
    </TouchableOpacity>
  );
}

function QuickFilter({ label, isSelected, onPress }: QuickFilterProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderColor: isSelected ? colors.primary : colors.border,
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterText,
        { color: isSelected ? 'white' : colors.text }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const { colors, location } = useLocationTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISearch, setShowAISearch] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

  const quickFilters = [
    'Available Today',
    'Top Rated',
    'Verified Only',
    'Emergency Service',
    'Budget Friendly',
    'Premium Service'
  ];

  const recentSearches = [
    'Plumber near me',
    'House cleaning',
    'Wedding photographer',
    'Car mechanic',
    'Pool maintenance'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Discover Services</Text>
          <Text style={styles.headerSubtitle}>
            Find trusted professionals in {location === 'cayman' ? 'Cayman Islands' : 'Jamaica'}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search services or describe your needs..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity 
              style={[styles.aiButton, { backgroundColor: colors.accent }]}
              onPress={() => setShowAISearch(true)}
            >
              <Ionicons name="chatbubble-ellipses" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Filters */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Filters</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <View style={styles.filtersContainer}>
              {quickFilters.map((filter) => (
                <QuickFilter
                  key={filter}
                  label={filter}
                  isSelected={selectedFilters.includes(filter)}
                  onPress={() => toggleFilter(filter)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse Categories</Text>
          <View style={styles.categoriesGrid}>
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
          </View>
        </View>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Searches</Text>
              <TouchableOpacity>
                <Text style={[styles.clearAll, { color: colors.primary }]}>Clear All</Text>
              </TouchableOpacity>
            </View>
            {recentSearches.map((search, index) => (
              <TouchableOpacity key={index} style={styles.recentSearchItem}>
                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                <Text style={[styles.recentSearchText, { color: colors.text }]}>{search}</Text>
                <TouchableOpacity>
                  <Ionicons name="close" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Popular This Week */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular This Week</Text>
          <View style={[styles.popularCard, { backgroundColor: colors.surface }]}>
            <View style={styles.popularHeader}>
              <View style={[styles.popularIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="trending-up" size={20} color={colors.primary} />
              </View>
              <View style={styles.popularInfo}>
                <Text style={[styles.popularTitle, { color: colors.text }]}>
                  Pool Maintenance & Cleaning
                </Text>
                <Text style={[styles.popularDescription, { color: colors.textSecondary }]}>
                  High demand due to tourist season
                </Text>
              </View>
              <TouchableOpacity style={[styles.exploreButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.exploreButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* AI Search Modal */}
      <Modal
        visible={showAISearch}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <AISearchScreen 
          location={location} 
          onClose={() => setShowAISearch(false)} 
        />
      </Modal>
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
  headerContent: {
    marginBottom: CaribbeanDesign.spacing.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: CaribbeanDesign.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: CaribbeanDesign.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: CaribbeanDesign.spacing.md,
  },
  clearAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  filtersScroll: {
    marginLeft: -CaribbeanDesign.spacing.lg,
    paddingLeft: CaribbeanDesign.spacing.lg,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: CaribbeanDesign.spacing.sm,
    paddingRight: CaribbeanDesign.spacing.lg,
  },
  filterChip: {
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.sm,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CaribbeanDesign.spacing.md,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47%',
    alignItems: 'center',
    padding: CaribbeanDesign.spacing.lg,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    ...CaribbeanDesign.shadows.sm,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CaribbeanDesign.spacing.md,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: CaribbeanDesign.spacing.xs,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CaribbeanDesign.spacing.md,
    gap: CaribbeanDesign.spacing.md,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
  },
  popularCard: {
    borderRadius: CaribbeanDesign.borderRadius.lg,
    padding: CaribbeanDesign.spacing.lg,
    ...CaribbeanDesign.shadows.sm,
  },
  popularHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.md,
  },
  popularIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularInfo: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  popularDescription: {
    fontSize: 14,
  },
  exploreButton: {
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.sm,
    borderRadius: CaribbeanDesign.borderRadius.md,
  },
  exploreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});