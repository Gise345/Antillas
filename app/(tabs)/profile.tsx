// app/(tabs)/profile.tsx
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
import { LinearGradient } from 'expo-linear-gradient';
import { useLocationTheme } from '@/contexts/LocationContext';
import { CaribbeanDesign } from '@/constants/CaribbeanColors';

interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  isDestructive?: boolean;
}

interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  color: string;
}

function ProfileMenuItem({ icon, title, subtitle, onPress, rightElement, isDestructive }: ProfileMenuItemProps) {
  const { colors } = useLocationTheme();
  
  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { 
        backgroundColor: isDestructive ? '#EF4444' + '20' : colors.primary + '20' 
      }]}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={isDestructive ? '#EF4444' : colors.primary} 
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: isDestructive ? '#EF4444' : colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

function StatsCard({ icon, title, value, color }: StatsCardProps) {
  const { colors } = useLocationTheme();
  
  return (
    <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
      <View style={[styles.statsIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={[styles.statsValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statsTitle, { color: colors.textSecondary }]}>{title}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { colors, location } = useLocationTheme();
  
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
          onPress: () => console.log('Switch location')
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.profileHeader}>
          <View style={styles.headerContent}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@email.com</Text>
              <View style={styles.locationBadge}>
                <Text style={styles.locationBadgeText}>
                  {locationData[location].flag} {locationData[location].name}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

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
            color="#FFD700"
          />
          <StatsCard
            icon="heart"
            title="Favorites"
            value="24"
            color="#EF4444"
          />
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="person-outline"
              title="Personal Information"
              subtitle="Update your details and preferences"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage cards and payment options"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="location-outline"
              title="Addresses"
              subtitle="Manage your saved addresses"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="shield-checkmark-outline"
              title="Verification"
              subtitle="Verify your identity for trust"
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Push, email, and SMS preferences"
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
              subtitle="Follow system setting"
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support & Legal</Text>
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
              subtitle="Get help from our Caribbean team"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="document-text-outline"
              title="Terms & Privacy"
              subtitle="Legal information and policies"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="star-outline"
              title="Rate Antillas"
              subtitle="Share your feedback with us"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Business</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="briefcase-outline"
              title="Become a Service Provider"
              subtitle="Start offering your services on Antillas"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="analytics-outline"
              title="Provider Dashboard"
              subtitle="Manage your business profile"
              onPress={() => {}}
            />
            <ProfileMenuItem
              icon="people-outline"
              title="Refer Friends"
              subtitle="Earn rewards for referrals"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, { color: '#EF4444' }]}>Account Actions</Text>
          <View style={styles.menuGroup}>
            <ProfileMenuItem
              icon="log-out-outline"
              title="Logout"
              subtitle="Sign out of your account"
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

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appName, { color: colors.primary }]}>Antillas</Text>
          <Text style={[styles.appTagline, { color: colors.textSecondary }]}>
            Connecting Caribbean Excellence
          </Text>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Version 1.0.0
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
    padding: CaribbeanDesign.spacing.xl,
    borderBottomLeftRadius: CaribbeanDesign.borderRadius.xl,
    borderBottomRightRadius: CaribbeanDesign.borderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  locationBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: CaribbeanDesign.borderRadius.md,
    marginTop: CaribbeanDesign.spacing.xs,
  },
  locationBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  editButton: {
    padding: CaribbeanDesign.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    paddingVertical: CaribbeanDesign.spacing.xl,
    gap: CaribbeanDesign.spacing.md,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    padding: CaribbeanDesign.spacing.lg,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.sm,
    ...CaribbeanDesign.shadows.sm,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: CaribbeanDesign.spacing.xl,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  lastSection: {
    marginBottom: CaribbeanDesign.spacing.xxl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: CaribbeanDesign.spacing.md,
  },
  menuGroup: {
    gap: CaribbeanDesign.spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: CaribbeanDesign.spacing.md,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.md,
    ...CaribbeanDesign.shadows.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    gap: 2,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 14,
  },
  verificationBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: CaribbeanDesign.spacing.xl,
    gap: 4,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  appTagline: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  versionText: {
    fontSize: 12,
    marginTop: CaribbeanDesign.spacing.sm,
  },
});