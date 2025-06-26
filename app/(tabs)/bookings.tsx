// app/(tabs)/bookings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocationTheme } from '@/contexts/LocationContext';
import { CaribbeanDesign } from '@/constants/CaribbeanColors';

type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  currency: string;
  location: string;
  rating?: number;
}

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

function BookingCard({ booking, onPress }: BookingCardProps) {
  const { colors } = useLocationTheme();
  
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming': return colors.primary;
      case 'ongoing': return '#F59E0B';
      case 'completed': return colors.success;
      case 'cancelled': return '#EF4444';
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming': return 'time-outline';
      case 'ongoing': return 'hourglass-outline';
      case 'completed': return 'checkmark-circle';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.bookingCard, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.bookingHeader}>
        <Image source={{ uri: booking.providerImage }} style={styles.providerImage} />
        <View style={styles.bookingInfo}>
          <Text style={[styles.serviceName, { color: colors.text }]}>{booking.serviceName}</Text>
          <Text style={[styles.providerName, { color: colors.primary }]}>{booking.providerName}</Text>
          <Text style={[styles.bookingLocation, { color: colors.textSecondary }]}>
            {booking.location}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
          <Ionicons name={getStatusIcon(booking.status) as any} size={14} color={getStatusColor(booking.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {booking.date} at {booking.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="card-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {booking.currency}{booking.price}
          </Text>
        </View>
      </View>

      {booking.status === 'completed' && booking.rating && (
        <View style={styles.ratingContainer}>
          <Text style={[styles.ratingLabel, { color: colors.textSecondary }]}>Your rating:</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={14}
                color={star <= booking.rating! ? '#FFD700' : '#E5E5E5'}
              />
            ))}
          </View>
        </View>
      )}

      <View style={styles.bookingActions}>
        {booking.status === 'upcoming' && (
          <>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="chatbubble-outline" size={16} color={colors.primary} />
              <Text style={[styles.actionButtonText, { color: colors.primary }]}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Ionicons name="close-outline" size={16} color="#EF4444" />
              <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
        
        {booking.status === 'ongoing' && (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="call-outline" size={16} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Contact Provider</Text>
          </TouchableOpacity>
        )}

        {booking.status === 'completed' && !booking.rating && (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success + '20' }]}>
            <Ionicons name="star-outline" size={16} color={colors.success} />
            <Text style={[styles.actionButtonText, { color: colors.success }]}>Rate Service</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function BookingsScreen() {
  const { colors, location } = useLocationTheme();
  const [selectedTab, setSelectedTab] = useState<'all' | BookingStatus>('all');

  const mockBookings: Booking[] = [
    {
      id: '1',
      serviceName: 'Pool Cleaning & Maintenance',
      providerName: 'Marcus Johnson',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      date: 'Today',
      time: '2:00 PM',
      status: 'upcoming',
      price: location === 'cayman' ? 120 : 9500,
      currency: location === 'cayman' ? 'CI$' : 'J$',
      location: location === 'cayman' ? 'Seven Mile Beach' : 'Kingston',
    },
    {
      id: '2',
      serviceName: 'Interior Design Consultation',
      providerName: 'Sarah Williams',
      providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=50&h=50&fit=crop&crop=face',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'upcoming',
      price: location === 'cayman' ? 200 : 16000,
      currency: location === 'cayman' ? 'CI$' : 'J$',
      location: location === 'cayman' ? 'George Town' : 'Montego Bay',
    },
    {
      id: '3',
      serviceName: 'AC Repair Service',
      providerName: 'David Brown',
      providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      date: 'Mar 15',
      time: '9:00 AM',
      status: 'ongoing',
      price: location === 'cayman' ? 150 : 12000,
      currency: location === 'cayman' ? 'CI$' : 'J$',
      location: location === 'cayman' ? 'West Bay' : 'Spanish Town',
    },
    {
      id: '4',
      serviceName: 'House Deep Cleaning',
      providerName: 'Lisa Garcia',
      providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      date: 'Mar 10',
      time: '8:00 AM',
      status: 'completed',
      price: location === 'cayman' ? 100 : 8000,
      currency: location === 'cayman' ? 'CI$' : 'J$',
      location: location === 'cayman' ? 'Camana Bay' : 'New Kingston',
      rating: 5,
    },
    {
      id: '5',
      serviceName: 'Garden Landscaping',
      providerName: 'Michael Thompson',
      providerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      date: 'Mar 5',
      time: '7:00 AM',
      status: 'completed',
      price: location === 'cayman' ? 300 : 24000,
      currency: location === 'cayman' ? 'CI$' : 'J$',
      location: location === 'cayman' ? 'East End' : 'Portmore',
    },
  ];

  const tabs = [
    { key: 'all', label: 'All', count: mockBookings.length },
    { key: 'upcoming', label: 'Upcoming', count: mockBookings.filter(b => b.status === 'upcoming').length },
    { key: 'ongoing', label: 'Ongoing', count: mockBookings.filter(b => b.status === 'ongoing').length },
    { key: 'completed', label: 'Completed', count: mockBookings.filter(b => b.status === 'completed').length },
  ];

  const filteredBookings = selectedTab === 'all' 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === selectedTab);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>
            Manage your service appointments
          </Text>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                {
                  backgroundColor: selectedTab === tab.key ? colors.primary : colors.surface,
                  borderColor: selectedTab === tab.key ? colors.primary : colors.border,
                }
              ]}
              onPress={() => setSelectedTab(tab.key as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === tab.key ? 'white' : colors.text }
                ]}
              >
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View
                  style={[
                    styles.tabBadge,
                    { backgroundColor: selectedTab === tab.key ? 'rgba(255,255,255,0.3)' : colors.primary + '20' }
                  ]}
                >
                  <Text
                    style={[
                      styles.tabBadgeText,
                      { color: selectedTab === tab.key ? 'white' : colors.primary }
                    ]}
                  >
                    {tab.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBookings.length > 0 ? (
          <View style={styles.bookingsList}>
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => {}}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="calendar-outline" size={48} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No {selectedTab !== 'all' ? selectedTab : ''} bookings
            </Text>
            <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
              {selectedTab === 'all' 
                ? "You haven't made any bookings yet. Discover amazing services near you!"
                : `You don't have any ${selectedTab} bookings at the moment.`
              }
            </Text>
            <TouchableOpacity
              style={[styles.exploreButton, { backgroundColor: colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreButtonText}>Explore Services</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Quick Actions FAB */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
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
  tabsContainer: {
    paddingVertical: CaribbeanDesign.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabsScroll: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.sm,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    borderWidth: 1,
    marginRight: CaribbeanDesign.spacing.sm,
    gap: CaribbeanDesign.spacing.xs,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  bookingsList: {
    padding: CaribbeanDesign.spacing.lg,
    gap: CaribbeanDesign.spacing.md,
  },
  bookingCard: {
    padding: CaribbeanDesign.spacing.lg,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    ...CaribbeanDesign.shadows.sm,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: CaribbeanDesign.spacing.md,
    gap: CaribbeanDesign.spacing.md,
  },
  providerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  bookingInfo: {
    flex: 1,
    gap: 2,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  providerName: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookingLocation: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CaribbeanDesign.spacing.sm,
    paddingVertical: 4,
    borderRadius: CaribbeanDesign.borderRadius.sm,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: CaribbeanDesign.spacing.sm,
    marginBottom: CaribbeanDesign.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.sm,
  },
  detailText: {
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.sm,
    marginBottom: CaribbeanDesign.spacing.md,
  },
  ratingLabel: {
    fontSize: 12,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: CaribbeanDesign.spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CaribbeanDesign.spacing.sm,
    borderRadius: CaribbeanDesign.borderRadius.md,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: CaribbeanDesign.spacing.xl,
    paddingVertical: CaribbeanDesign.spacing.xxl * 2,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CaribbeanDesign.spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: CaribbeanDesign.spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: CaribbeanDesign.spacing.xl,
  },
  exploreButton: {
    paddingVertical: CaribbeanDesign.spacing.md,
    paddingHorizontal: CaribbeanDesign.spacing.xl,
    borderRadius: CaribbeanDesign.borderRadius.lg,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  fabContainer: {
    position: 'absolute',
    bottom: CaribbeanDesign.spacing.xl,
    right: CaribbeanDesign.spacing.lg,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...CaribbeanDesign.shadows.lg,
  },
});