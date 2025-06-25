// File: C:\Antillas\app\(tabs)\bookings.tsx

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
import { useLocationTheme } from '@/contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
type BookingFilter = 'all' | BookingStatus;

interface Booking {
  id: string;
  providerName: string;
  providerImage: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  currency: string;
  location: string;
  rating?: number;
  hasReview?: boolean;
}

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
  onMessage: () => void;
  onCancel?: () => void;
  onReview?: () => void;
}

function BookingCard({ booking, onPress, onMessage, onCancel, onReview }: BookingCardProps) {
  const { colors } = useLocationTheme();
  
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming': return colors.primary;
      case 'ongoing': return colors.warning;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return CommonColors.gray[500];
    }
  };

  const getStatusText = (status: BookingStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <TouchableOpacity
      style={[styles.bookingCard, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.providerInfo}>
          <Image source={{ uri: booking.providerImage }} style={styles.providerImage} />
          <View style={styles.providerDetails}>
            <Text style={[styles.providerName, { color: colors.onSurface }]}>
              {booking.providerName}
            </Text>
            <Text style={[styles.serviceName, { color: colors.primary }]}>
              {booking.serviceName}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {getStatusText(booking.status)}
          </Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={CommonColors.gray[500]} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {booking.date} at {booking.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={CommonColors.gray[500]} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {booking.location}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="card-outline" size={16} color={CommonColors.gray[500]} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {booking.currency}{booking.price}
          </Text>
        </View>
      </View>

      {booking.status === 'completed' && booking.rating && (
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={14}
                color={star <= booking.rating! ? '#FCD34D' : CommonColors.gray[300]}
              />
            ))}
          </View>
          <Text style={[styles.ratingText, { color: colors.onSurface }]}>
            Rated {booking.rating}/5
          </Text>
        </View>
      )}

      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.messageButton, { backgroundColor: colors.primary + '10' }]}
          onPress={onMessage}
        >
          <Ionicons name="chatbubble-outline" size={16} color={colors.primary} />
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>Message</Text>
        </TouchableOpacity>

        {booking.status === 'upcoming' && onCancel && (
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Ionicons name="close-outline" size={16} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>Cancel</Text>
          </TouchableOpacity>
        )}

        {booking.status === 'completed' && !booking.hasReview && onReview && (
          <TouchableOpacity
            style={[styles.actionButton, styles.reviewButton, { backgroundColor: colors.success + '10' }]}
            onPress={onReview}
          >
            <Ionicons name="star-outline" size={16} color={colors.success} />
            <Text style={[styles.actionButtonText, { color: colors.success }]}>Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function BookingsScreen() {
  const { colors } = useLocationTheme();
  const [activeFilter, setActiveFilter] = useState<BookingFilter>('all');

  const mockBookings: Booking[] = [
    {
      id: '1',
      providerName: 'Marcus Johnson',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      serviceName: 'Plumbing Repair',
      date: 'Today',
      time: '2:00 PM',
      status: 'upcoming',
      price: 150,
      currency: 'KYD $',
      location: 'George Town, Grand Cayman',
    },
    {
      id: '2',
      providerName: 'Sarah Williams',
      providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=150',
      serviceName: 'Interior Design Consultation',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'upcoming',
      price: 200,
      currency: 'KYD $',
      location: 'Seven Mile Beach',
    },
    {
      id: '3',
      providerName: 'David Brown',
      providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      serviceName: 'AC Maintenance',
      date: 'Jun 10',
      time: '9:00 AM',
      status: 'ongoing',
      price: 120,
      currency: 'KYD $',
      location: 'West Bay',
    },
    {
      id: '4',
      providerName: 'Lisa Garcia',
      providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      serviceName: 'House Cleaning',
      date: 'Jun 5',
      time: '8:00 AM',
      status: 'completed',
      price: 80,
      currency: 'KYD $',
      location: 'Camana Bay',
      rating: 5,
      hasReview: false,
    },
    {
      id: '5',
      providerName: 'Mike Thompson',
      providerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      serviceName: 'Landscaping',
      date: 'Jun 1',
      time: '7:00 AM',
      status: 'completed',
      price: 300,
      currency: 'KYD $',
      location: 'East End',
      rating: 4,
      hasReview: true,
    },
  ];

  const filters: { key: BookingFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'completed', label: 'Completed' },
  ];

  const filteredBookings = activeFilter === 'all' 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === activeFilter);

  const getBookingCounts = () => {
    const counts = mockBookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {} as Record<BookingStatus, number>);
    
    return {
      all: mockBookings.length,
      ...counts,
    };
  };

  const counts = getBookingCounts();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>My Bookings</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="calendar-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                {
                  backgroundColor: activeFilter === filter.key ? colors.primary : colors.surface,
                  borderColor: activeFilter === filter.key ? colors.primary : CommonColors.gray[300],
                }
              ]}
              onPress={() => setActiveFilter(filter.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === filter.key ? 'white' : colors.onSurface }
                ]}
              >
                {filter.label}
              </Text>
              {(counts as any)[filter.key] > 0 && (
                <View
                  style={[
                    styles.filterBadge,
                    { backgroundColor: activeFilter === filter.key ? 'white' : colors.primary }
                  ]}
                >
                  <Text
                    style={[
                      styles.filterBadgeText,
                      { color: activeFilter === filter.key ? colors.primary : 'white' }
                    ]}
                  >
                    {(counts as any)[filter.key]}
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
                onMessage={() => {}}
                onCancel={booking.status === 'upcoming' ? () => {} : undefined}
                onReview={booking.status === 'completed' && !booking.hasReview ? () => {} : undefined}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={CommonColors.gray[400]} />
            <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>
              No {activeFilter !== 'all' ? activeFilter : ''} bookings
            </Text>
            <Text style={[styles.emptyDescription, { color: CommonColors.gray[600] }]}>
              {activeFilter === 'all' 
                ? "You haven't made any bookings yet. Start by browsing our services!"
                : `You don't have any ${activeFilter} bookings at the moment.`
              }
            </Text>
            <TouchableOpacity
              style={[styles.browseButton, { backgroundColor: colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>Browse Services</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
    ...Typography.heading2,
    fontWeight: '600',
  },
  headerButton: {
    padding: Spacing.xs,
  },
  filterContainer: {
    paddingVertical: Spacing.md,
  },
  filterScroll: {
    paddingHorizontal: Spacing.lg,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginRight: Spacing.sm,
    gap: Spacing.xs,
  },
  filterText: {
    ...Typography.body2,
    fontWeight: '500',
  },
  filterBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  filterBadgeText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  bookingsList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  bookingCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  providerImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    ...Typography.body1,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  serviceName: {
    ...Typography.body2,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 11,
  },
  bookingDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    ...Typography.body2,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  messageButton: {
    // backgroundColor set dynamically
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: CommonColors.gray[300],
  },
  reviewButton: {
    // backgroundColor set dynamically
  },
  actionButtonText: {
    ...Typography.body2,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
  },
  emptyTitle: {
    ...Typography.heading3,
    fontWeight: '600',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    ...Typography.body1,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  browseButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  browseButtonText: {
    ...Typography.button,
    color: 'white',
  },
});