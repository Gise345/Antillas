// File: C:\Antillas\app\(tabs)\search.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocationTheme } from '@/contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface SearchCategoryProps {
  icon: string;
  title: string;
  onPress: () => void;
}

interface RecentSearchProps {
  query: string;
  onPress: () => void;
  onRemove: () => void;
}

function SearchCategory({ icon, title, onPress }: SearchCategoryProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.categoryItem, { backgroundColor: colors.surface }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIcon, { backgroundColor: colors.background }]}>
        <Ionicons name={icon as any} size={20} color={colors.primary} />
      </View>
      <Text style={[styles.categoryText, { color: colors.onSurface }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={16} color={CommonColors.gray[400]} />
    </TouchableOpacity>
  );
}

function RecentSearch({ query, onPress, onRemove }: RecentSearchProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity 
      style={styles.recentItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="time-outline" size={16} color={CommonColors.gray[500]} />
      <Text style={[styles.recentText, { color: colors.onSurface }]}>{query}</Text>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Ionicons name="close" size={16} color={CommonColors.gray[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const { colors } = useLocationTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIMode, setIsAIMode] = useState(false);

  const popularCategories = [
    { icon: 'home-outline', title: 'Home Cleaning' },
    { icon: 'construct-outline', title: 'Plumbing' },
    { icon: 'car-outline', title: 'Auto Repair' },
    { icon: 'cut-outline', title: 'Hair & Beauty' },
    { icon: 'camera-outline', title: 'Photography' },
    { icon: 'fitness-outline', title: 'Personal Training' },
    { icon: 'restaurant-outline', title: 'Catering' },
    { icon: 'leaf-outline', title: 'Landscaping' },
  ];

  const recentSearches = [
    'Plumber near me',
    'Wedding photographer',
    'House cleaning service',
    'AC repair technician',
  ];

  const aiSuggestions = [
    "I need someone to fix my leaky faucet",
    "Looking for a reliable house cleaner",
    "Need a photographer for my wedding",
    "Car won't start, need a mechanic",
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
          {isAIMode ? 'Ask AI Assistant' : 'Search Services'}
        </Text>
        <TouchableOpacity 
          style={[styles.aiToggle, { backgroundColor: isAIMode ? colors.primary : colors.surface }]}
          onPress={() => setIsAIMode(!isAIMode)}
        >
          <Ionicons 
            name="chatbox" 
            size={20} 
            color={isAIMode ? 'white' : colors.primary} 
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <Ionicons name="search" size={20} color={CommonColors.gray[500]} />
        <TextInput
          style={[styles.searchInput, { color: colors.onSurface }]}
          placeholder={isAIMode ? "Describe what you need..." : "Search services, providers..."}
          placeholderTextColor={CommonColors.gray[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          multiline={isAIMode}
          numberOfLines={isAIMode ? 3 : 1}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={CommonColors.gray[400]} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.micButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="mic" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!isAIMode ? (
          <>
            {/* Popular Categories */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Popular Categories
              </Text>
              <View style={styles.categoriesGrid}>
                {popularCategories.map((category, index) => (
                  <SearchCategory
                    key={index}
                    icon={category.icon}
                    title={category.title}
                    onPress={() => {}}
                  />
                ))}
              </View>
            </View>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                    Recent Searches
                  </Text>
                  <TouchableOpacity>
                    <Text style={[styles.clearAll, { color: colors.primary }]}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search, index) => (
                  <RecentSearch
                    key={index}
                    query={search}
                    onPress={() => setSearchQuery(search)}
                    onRemove={() => {}}
                  />
                ))}
              </View>
            )}
          </>
        ) : (
          <>
            {/* AI Suggestions */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Try asking me about...
              </Text>
              <Text style={[styles.sectionSubtitle, { color: CommonColors.gray[600] }]}>
                I can help you find the right service provider for your needs
              </Text>
              
              <View style={styles.aiSuggestionsContainer}>
                {aiSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.aiSuggestion, { backgroundColor: colors.surface }]}
                    onPress={() => setSearchQuery(suggestion)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="bulb-outline" size={16} color={colors.primary} />
                    <Text style={[styles.aiSuggestionText, { color: colors.onSurface }]}>
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* AI Features */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                AI Assistant Features
              </Text>
              
              <View style={[styles.featureCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.featureIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name="search" size={20} color={colors.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.onSurface }]}>
                    Smart Service Matching
                  </Text>
                  <Text style={[styles.featureDescription, { color: CommonColors.gray[600] }]}>
                    Describe your needs in natural language and get matched with the right providers
                  </Text>
                </View>
              </View>

              <View style={[styles.featureCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.featureIcon, { backgroundColor: colors.secondary + '20' }]}>
                  <Ionicons name="time" size={20} color={colors.secondary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.onSurface }]}>
                    Instant Availability
                  </Text>
                  <Text style={[styles.featureDescription, { color: CommonColors.gray[600] }]}>
                    Check real-time availability and get instant quotes from providers
                  </Text>
                </View>
              </View>

              <View style={[styles.featureCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.featureIcon, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="shield-checkmark" size={20} color={colors.success} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.onSurface }]}>
                    Verified Recommendations
                  </Text>
                  <Text style={[styles.featureDescription, { color: CommonColors.gray[600] }]}>
                    Get recommendations based on ratings, reviews, and verification status
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Search Button */}
      {searchQuery.length > 0 && (
        <View style={styles.searchButtonContainer}>
          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Ionicons name={isAIMode ? "chatbox" : "search"} size={20} color="white" />
            <Text style={styles.searchButtonText}>
              {isAIMode ? 'Ask AI Assistant' : 'Search Services'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    ...Typography.heading3,
    fontWeight: '600',
  },
  aiToggle: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body1,
    minHeight: 24,
  },
  micButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
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
    marginBottom: Spacing.md,
  },
  sectionSubtitle: {
    ...Typography.body2,
    marginBottom: Spacing.lg,
  },
  clearAll: {
    ...Typography.body2,
    fontWeight: '600',
  },
  categoriesGrid: {
    gap: Spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    ...Typography.body1,
    flex: 1,
    fontWeight: '500',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  recentText: {
    ...Typography.body1,
    flex: 1,
  },
  removeButton: {
    padding: Spacing.xs,
  },
  aiSuggestionsContainer: {
    gap: Spacing.md,
  },
  aiSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  aiSuggestionText: {
    ...Typography.body1,
    flex: 1,
  },
  featureCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  featureTitle: {
    ...Typography.body1,
    fontWeight: '600',
  },
  featureDescription: {
    ...Typography.body2,
  },
  searchButtonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Shadows.md,
  },
  searchButtonText: {
    ...Typography.button,
    color: 'white',
  },
});