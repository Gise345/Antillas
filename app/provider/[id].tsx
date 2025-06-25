// File: C:\Antillas\app\provider\[id].tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocationTheme } from '@/contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
}

interface Review {
  id: string;
  customerName: string;
  customerImage: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

interface Portfolio {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

function ServiceCard({ service, onBook }: ServiceCardProps) {
  const { colors } = useLocationTheme();
  
  return (
    <View style={[styles.serviceCard, { backgroundColor: colors.surface }]}>
      <View style={styles.serviceHeader}>
        <Text style={[styles.serviceName, { color: colors.onSurface }]}>{service.name}</Text>
        <Text style={[styles.servicePrice, { color: colors.primary }]}>
          {service.currency}{service.price}
        </Text>
      </View>
      <Text style={[styles.serviceDescription, { color: CommonColors.gray[600] }]}>
        {service.description}
      </Text>
      <View style={styles.serviceFooter}>
        <View style={styles.durationContainer}>
          <Ionicons name="time-outline" size={14} color={CommonColors.gray[500]} />
          <Text style={[styles.serviceDuration, { color: CommonColors.gray[500] }]}>
            {service.duration}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={onBook}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  const { colors } = useLocationTheme();
  
  return (
    <View style={[styles.reviewCard, { backgroundColor: colors.surface }]}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.customerImage }} style={styles.reviewerImage} />
        <View style={styles.reviewerInfo}>
          <Text style={[styles.reviewerName, { color: colors.onSurface }]}>
            {review.customerName}
          </Text>
          <Text style={[styles.reviewService, { color: colors.primary }]}>
            {review.service}
          </Text>
        </View>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name="star"
              size={14}
              color={star <= review.rating ? '#FCD34D' : CommonColors.gray[300]}
            />
          ))}
        </View>
      </View>
      <Text style={[styles.reviewComment, { color: colors.onSurface }]}>
        {review.comment}
      </Text>
      <Text style={[styles.reviewDate, { color: CommonColors.gray[500] }]}>
        {review.date}
      </Text>
    </View>
  );
}

export default function ServiceProviderProfile() {
  const { colors } = useLocationTheme();
  const [selectedTab, setSelectedTab] = useState<'services' | 'reviews' | 'portfolio'>('services');
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  const provider = {
    id: '1',
    name: 'Marcus Johnson',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    profession: 'Professional Plumber',
    rating: 4.9,
    reviewCount: 127,
    yearsExperience: 8,
    location: 'George Town, Grand Cayman',
    isVerified: true,
    isOnline: true,
    responseTime: '~ 1 hour',
    completedJobs: 245,
    about: 'Experienced plumber with over 8 years in the industry. Specializing in residential and commercial plumbing, emergency repairs, and installations. Licensed and insured.',
    certifications: ['Licensed Plumber', 'Emergency Response Certified', 'Insurance Verified'],
  };

  const services: Service[] = [
    {
      id: '1',
      name: 'Pipe Repair & Replacement',
      description: 'Fix leaky pipes, replace damaged sections, and install new piping.',
      price: 120,
      currency: 'KYD $',
      duration: '2-4 hours',
    },
    {
      id: '2',
      name: 'Drain Cleaning',
      description: 'Professional drain cleaning for kitchens, bathrooms, and main lines.',
      price: 80,
      currency: 'KYD $',
      duration: '1-2 hours',
    },
    {
      id: '3',
      name: 'Emergency Plumbing',
      description: '24/7 emergency plumbing services for urgent repairs.',
      price: 200,
      currency: 'KYD $',
      duration: '1-3 hours',
    },
    {
      id: '4',
      name: 'Bathroom Installation',
      description: 'Complete bathroom fixture installation and renovation.',
      price: 500,
      currency: 'KYD $',
      duration: '1-2 days',
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Sarah Williams',
      customerImage: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=150',
      rating: 5,
      comment: 'Excellent service! Marcus was professional, punctual, and fixed our kitchen sink quickly. Highly recommended!',
      date: 'June 5, 2024',
      service: 'Pipe Repair',
    },
    {
      id: '2',
      customerName: 'David Brown',
      customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 5,
      comment: 'Great work on our bathroom renovation. Clean, efficient, and reasonably priced.',
      date: 'May 28, 2024',
      service: 'Bathroom Installation',
    },
    {
      id: '3',
      customerName: 'Lisa Garcia',
      customerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4,
      comment: 'Quick response time for emergency call. Fixed the issue and explained everything clearly.',
      date: 'May 20, 2024',
      service: 'Emergency Plumbing',
    },
  ];

  const portfolio: Portfolio[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300',
      title: 'Modern Bathroom Renovation',
      description: 'Complete bathroom makeover with new fixtures and plumbing.',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1584622781564-1d987cc5fecd?w=300',
      title: 'Kitchen Sink Installation',
      description: 'Professional kitchen sink and faucet installation.',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
      title: 'Emergency Pipe Repair',
      description: 'Quick response emergency pipe repair and replacement.',
    },
  ];

  const tabs = [
    { key: 'services', label: 'Services', count: services.length },
    { key: 'reviews', label: 'Reviews', count: reviews.length },
    { key: 'portfolio', label: 'Portfolio', count: portfolio.length },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Provider Info */}
        <View style={[styles.providerInfo, { backgroundColor: colors.surface }]}>
          <View style={styles.providerHeader}>
            <View style={styles.providerImageContainer}>
              <Image source={{ uri: provider.image }} style={styles.providerImage} />
              {provider.isOnline && (
                <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
              )}
            </View>
            
            <View style={styles.providerDetails}>
              <View style={styles.nameContainer}>
                <Text style={[styles.providerName, { color: colors.onSurface }]}>
                  {provider.name}
                </Text>
                {provider.isVerified && (
                  <View style={[styles.verifiedBadge, { backgroundColor: colors.primary }]}>
                    <Ionicons name="checkmark" size={12} color="white" />
                  </View>
                )}
              </View>
              
              <Text style={[styles.profession, { color: colors.primary }]}>
                {provider.profession}
              </Text>
              
              <View style={styles.ratingContainer}>
                <View style={styles.rating}>
                  <Ionicons name="star" size={16} color="#FCD34D" />
                  <Text style={[styles.ratingText, { color: colors.onSurface }]}>
                    {provider.rating}
                  </Text>
                  <Text style={[styles.reviewCount, { color: CommonColors.gray[600] }]}>
                    ({provider.reviewCount} reviews)
                  </Text>
                </View>
              </View>
              
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color={CommonColors.gray[500]} />
                <Text style={[styles.location, { color: CommonColors.gray[600] }]}>
                  {provider.location}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {provider.yearsExperience}
              </Text>
              <Text style={[styles.statLabel, { color: CommonColors.gray[600] }]}>
                Years Exp.
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {provider.completedJobs}
              </Text>
              <Text style={[styles.statLabel, { color: CommonColors.gray[600] }]}>
                Jobs Done
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {provider.responseTime}
              </Text>
              <Text style={[styles.statLabel, { color: CommonColors.gray[600] }]}>
                Response
              </Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.aboutSection}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>About</Text>
            <Text style={[styles.aboutText, { color: CommonColors.gray[600] }]}>
              {provider.about}
            </Text>
            
            <View style={styles.certifications}>
              {provider.certifications.map((cert, index) => (
                <View key={index} style={[styles.certBadge, { backgroundColor: colors.primary + '10' }]}>
                  <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
                  <Text style={[styles.certText, { color: colors.primary }]}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedTab === tab.key && { borderBottomColor: colors.primary }
              ]}
              onPress={() => setSelectedTab(tab.key as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === tab.key ? colors.primary : CommonColors.gray[600] }
                ]}
              >
                {tab.label} ({tab.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'services' && (
            <View style={styles.servicesContainer}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBook={() => setBookingModalVisible(true)}
                />
              ))}
            </View>
          )}

          {selectedTab === 'reviews' && (
            <View style={styles.reviewsContainer}>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}

          {selectedTab === 'portfolio' && (
            <View style={styles.portfolioContainer}>
              {portfolio.map((item) => (
                <View key={item.id} style={[styles.portfolioItem, { backgroundColor: colors.surface }]}>
                  <Image source={{ uri: item.image }} style={styles.portfolioImage} />
                  <Text style={[styles.portfolioTitle, { color: colors.onSurface }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.portfolioDescription, { color: CommonColors.gray[600] }]}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[styles.messageButton, { backgroundColor: colors.primary + '20' }]}
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble-outline" size={20} color={colors.primary} />
          <Text style={[styles.messageButtonText, { color: colors.primary }]}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={() => setBookingModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Service</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <Modal
        visible={bookingModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBookingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
                Book Service
              </Text>
              <TouchableOpacity 
                onPress={() => setBookingModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={CommonColors.gray[600]} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.modalSubtitle, { color: CommonColors.gray[600] }]}>
              Select a service to book with {provider.name}
            </Text>
            
            <ScrollView style={styles.modalServices}>
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[styles.modalServiceItem, { borderColor: colors.primary + '20' }]}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalServiceInfo}>
                    <Text style={[styles.modalServiceName, { color: colors.onSurface }]}>
                      {service.name}
                    </Text>
                    <Text style={[styles.modalServicePrice, { color: colors.primary }]}>
                      {service.currency}{service.price}
                    </Text>
                  </View>
                  <Text style={[styles.modalServiceDuration, { color: CommonColors.gray[600] }]}>
                    Duration: {service.duration}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  backButton: {
    padding: Spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
  },
  providerInfo: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.md,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  providerImageContainer: {
    position: 'relative',
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: 'white',
  },
  providerDetails: {
    flex: 1,
    gap: Spacing.xs,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  providerName: {
    ...Typography.heading3,
    fontWeight: '600',
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profession: {
    ...Typography.body1,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingText: {
    ...Typography.body2,
    fontWeight: '600',
  },
  reviewCount: {
    ...Typography.body2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  location: {
    ...Typography.body2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonColors.gray[200],
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    ...Typography.heading4,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption,
  },
  aboutSection: {
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading4,
    fontWeight: '600',
  },
  aboutText: {
    ...Typography.body1,
    lineHeight: 24,
  },
  certifications: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  certBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  certText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    ...Typography.body2,
    fontWeight: '600',
  },
  tabContent: {
    padding: Spacing.lg,
  },
  servicesContainer: {
    gap: Spacing.md,
  },
  serviceCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  serviceName: {
    ...Typography.body1,
    fontWeight: '600',
    flex: 1,
  },
  servicePrice: {
    ...Typography.heading4,
    fontWeight: '700',
  },
  serviceDescription: {
    ...Typography.body2,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  serviceDuration: {
    ...Typography.caption,
  },
  bookButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  bookButtonText: {
    ...Typography.body2,
    color: 'white',
    fontWeight: '600',
  },
  reviewsContainer: {
    gap: Spacing.md,
  },
  reviewCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
  },
  reviewerInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  reviewerName: {
    ...Typography.body2,
    fontWeight: '600',
  },
  reviewService: {
    ...Typography.caption,
    fontWeight: '500',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    ...Typography.body2,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  reviewDate: {
    ...Typography.caption,
  },
  portfolioContainer: {
    gap: Spacing.md,
  },
  portfolioItem: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  portfolioImage: {
    width: '100%',
    height: 200,
  },
  portfolioTitle: {
    ...Typography.body1,
    fontWeight: '600',
    padding: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  portfolioDescription: {
    ...Typography.body2,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadows.lg,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  messageButtonText: {
    ...Typography.button,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: CommonColors.gray[200],
  },
  modalTitle: {
    ...Typography.heading3,
    fontWeight: '600',
  },
  closeButton: {
    padding: Spacing.xs,
  },
  modalSubtitle: {
    ...Typography.body1,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  modalServices: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  modalServiceItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  modalServiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  modalServiceName: {
    ...Typography.body1,
    fontWeight: '600',
    flex: 1,
  },
  modalServicePrice: {
    ...Typography.body1,
    fontWeight: '700',
  },
  modalServiceDuration: {
    ...Typography.caption,
  },
});