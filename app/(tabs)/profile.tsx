// File: C:\CaribTradeHub\app\(tabs)\profile.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocation, useLocationTheme } from '@/contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  isDestructive?: boolean;
}

function ProfileMenuItem({ icon, title, subtitle, onPress, rightElement, isDestructive }: ProfileMenuItemProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: isDestructive ? colors.error + '10' : colors.background }]}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={isDestructive ? colors.error : colors.primary} 
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: isDestructive ? colors.error : colors.onSurface }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.menuSubtitle, { color: CommonColors.gray[600] }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={16} color={CommonColors.gray[400]} />
      )}
    </TouchableOpacity>
  );
}

interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  color: string;
}

function StatsCard({ icon, title, value, color }: StatsCardProps) {
  const { colors } = useLocationTheme();
  
  return (
    <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
      <View style={[styles.statsIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={[styles.statsValue, { color: colors.onSurface }]}>{value}</Text>
      <Text style={[styles.statsTitle, { color: CommonColors.gray[600] }]}>{title}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { colors, location } = useLocationTheme();
  const { showLocationSelector, resetLocationSelection } = useLocation();
  
  const locationData = {
    cayman: { name: 'Cayman Islands', flag: '🇰🇾' },
    jamaica: { name: 'Jamaica', flag: '🇯🇲' },
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleSwitchLocation = () => {
    Alert.alert(
      'Switch Location',
      'Do you want to change your current location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Change Location', 
          onPress: () => showLocationSelector()
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={[styles.editImageButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.onSurface }]}>John Doe</Text>
            <Text style={[styles.profileEmail, { color: CommonColors.gray[600] }]}>
              john.doe@email.com
            </Text>
            <View style={styles.locationBadge}>
              <Text style={[styles.locationBadgeText, { color: colors.primary }]}>
                {locationData[location].flag} {locationData[location].name}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatsCard
            icon="calendar"
            title="Bookings"
            value="12"
            color={colors.primary}
          />
          <StatsCard
            icon="star"
            title="Reviews Given"
            value="8"
            color={colors.warning}
          />
          <StatsCard
            icon="heart"
            title="Favorites"
            value="24"
            color={colors.error}
          />
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Account</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="person-outline"
              title="Personal Information"
              subtitle="Update your details"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage cards and payments"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="location-outline"
              title="Addresses"
              subtitle="Manage saved addresses"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="shield-checkmark-outline"
              title="Verification"
              subtitle="Verify your identity"
              onPress={() => {}}
              rightElement={
                <View style={[styles.verificationBadge, { backgroundColor: colors.success }]}>
                  <Ionicons name="checkmark" size={12} color="white" />
                </View>
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Preferences</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Push, email, SMS preferences"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="language-outline"
              title="Language"
              subtitle="English"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="moon-outline"
              title="Dark Mode"
              subtitle="System default"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="location"
              title="Current Location"
              subtitle={`${locationData[location].flag} ${locationData[location].name}`}
              onPress={handleSwitchLocation}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Support</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Help Center"
              subtitle="FAQs and support articles"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="chatbubble-outline"
              title="Contact Support"
              subtitle="Get help from our team"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="document-text-outline"
              title="Terms & Privacy"
              subtitle="Legal information"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="star-outline"
              title="Rate the App"
              subtitle="Share your feedback"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Business</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="briefcase-outline"
              title="Become a Provider"
              subtitle="Offer your services"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="analytics-outline"
              title="Business Dashboard"
              subtitle="Manage your business"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, { color: colors.error }]}>Account Actions</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="log-out-outline"
              title="Logout"
              onPress={handleLogout}
              isDestructive
            />
            <ProfileMenuItem
              icon="trash-outline"
              title="Delete Account"
              subtitle="Permanently delete your account"
              onPress={handleDeleteAccount}
              isDestructive
            />
          </View>
        </View>

        {/* App Version */}
        <View style={styles.appVersion}>
          <Text style={[styles.versionText, { color: CommonColors.gray[500] }]}>
            Carib Trade Hub v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderRadius: BorderRadius.xl,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  profileName: {
    ...Typography.heading3,
    fontWeight: '600',
  },
  profileEmail: {
    ...Typography.body2,
  },
  locationBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: CommonColors.gray[100],
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs,
  },
  locationBadgeText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  editButton: {
    padding: Spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsValue: {
    ...Typography.heading3,
    fontWeight: '700',
  },
  statsTitle: {
    ...Typography.caption,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  lastSection: {
    marginBottom: Spacing.xxxl,
  },
  sectionTitle: {
    ...Typography.heading4,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  menuGroup: {
    gap: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  menuTitle: {
    ...Typography.body1,
    fontWeight: '500',
  },
  menuSubtitle: {
    ...Typography.body2,
  },
  verificationBadge: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appVersion: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  versionText: {
    ...Typography.caption,
  },
});