// File: C:\CaribTradeHub\app\booking\[serviceId].tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocationTheme } from '@/contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

type BookingStep = 'datetime' | 'details' | 'payment' | 'confirmation';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'cash';
  name: string;
  details: string;
  icon: string;
}

export default function BookingFlowScreen() {
  const { colors } = useLocationTheme();
  const [currentStep, setCurrentStep] = useState<BookingStep>('datetime');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  // Mock data
  const service = {
    id: '1',
    name: 'Pipe Repair & Replacement',
    price: 120,
    currency: 'KYD $',
    duration: '2-4 hours',
    providerName: 'Marcus Johnson',
  };

  const availableDates = [
    { date: '2024-06-10', label: 'Today' },
    { date: '2024-06-11', label: 'Tomorrow' },
    { date: '2024-06-12', label: 'Wed, Jun 12' },
    { date: '2024-06-13', label: 'Thu, Jun 13' },
    { date: '2024-06-14', label: 'Fri, Jun 14' },
  ];

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '8:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: true },
    { id: '3', time: '12:00 PM', available: false },
    { id: '4', time: '2:00 PM', available: true },
    { id: '5', time: '4:00 PM', available: true },
    { id: '6', time: '6:00 PM', available: false },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'Credit Card',
      details: '**** **** **** 1234',
      icon: 'card-outline',
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal',
      details: 'john.doe@email.com',
      icon: 'logo-paypal',
    },
    {
      id: '3',
      type: 'cash',
      name: 'Cash on Service',
      details: 'Pay when service is completed',
      icon: 'cash-outline',
    },
  ];

  const steps = [
    { key: 'datetime', title: 'Date & Time', icon: 'calendar-outline' },
    { key: 'details', title: 'Service Details', icon: 'document-text-outline' },
    { key: 'payment', title: 'Payment', icon: 'card-outline' },
    { key: 'confirmation', title: 'Confirmation', icon: 'checkmark-circle-outline' },
  ];

  const getCurrentStepIndex = () => steps.findIndex(step => step.key === currentStep);

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key as BookingStep);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key as BookingStep);
    }
  };

  const handleBooking = () => {
    Alert.alert(
      'Booking Confirmed!',
      'Your service has been booked successfully. You will receive a confirmation email shortly.',
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => {
        const isActive = index <= getCurrentStepIndex();
        const isCurrent = step.key === currentStep;
        
        return (
          <View key={step.key} style={styles.progressStep}>
            <View
              style={[
                styles.progressIcon,
                {
                  backgroundColor: isActive ? colors.primary : CommonColors.gray[300],
                  borderColor: isCurrent ? colors.primary : 'transparent',
                }
              ]}
            >
              <Ionicons
                name={step.icon as any}
                size={16}
                color={isActive ? 'white' : CommonColors.gray[600]}
              />
            </View>
            <Text
              style={[
                styles.progressLabel,
                { color: isActive ? colors.primary : CommonColors.gray[600] }
              ]}
            >
              {step.title}
            </Text>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.progressLine,
                  { backgroundColor: isActive ? colors.primary : CommonColors.gray[300] }
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );

  const renderDateTimeStep = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: colors.onSurface }]}>
        Select Date & Time
      </Text>
      
      <View style={styles.dateContainer}>
        <Text style={[styles.sectionLabel, { color: colors.onSurface }]}>Choose Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {availableDates.map((date) => (
            <TouchableOpacity
              key={date.date}
              style={[
                styles.dateCard,
                {
                  backgroundColor: selectedDate === date.date ? colors.primary : colors.surface,
                  borderColor: selectedDate === date.date ? colors.primary : CommonColors.gray[300],
                }
              ]}
              onPress={() => setSelectedDate(date.date)}
            >
              <Text
                style={[
                  styles.dateText,
                  { color: selectedDate === date.date ? 'white' : colors.onSurface }
                ]}
              >
                {date.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.timeContainer}>
        <Text style={[styles.sectionLabel, { color: colors.onSurface }]}>Choose Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                {
                  backgroundColor: selectedTime === slot.time ? colors.primary : colors.surface,
                  borderColor: selectedTime === slot.time ? colors.primary : CommonColors.gray[300],
                  opacity: slot.available ? 1 : 0.5,
                }
              ]}
              onPress={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: selectedTime === slot.time ? 'white' : colors.onSurface }
                ]}
              >
                {slot.time}
              </Text>
              {!slot.available && (
                <Text style={[styles.unavailableText, { color: colors.error }]}>
                  Booked
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderDetailsStep = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: colors.onSurface }]}>
        Service Details
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: colors.onSurface }]}>Service Address *</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.surface, color: colors.onSurface }]}
          placeholder="Enter your address"
          placeholderTextColor={CommonColors.gray[500]}
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: colors.onSurface }]}>Additional Notes</Text>
        <TextInput
          style={[
            styles.textInput,
            styles.notesInput,
            { backgroundColor: colors.surface, color: colors.onSurface }
          ]}
          placeholder="Any specific requirements or details..."
          placeholderTextColor={CommonColors.gray[500]}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={[styles.serviceInfo, { backgroundColor: colors.surface }]}>
        <Text style={[styles.serviceInfoTitle, { color: colors.onSurface }]}>
          Service Summary
        </Text>
        <View style={styles.serviceInfoRow}>
          <Text style={[styles.serviceInfoLabel, { color: CommonColors.gray[600] }]}>
            Service:
          </Text>
          <Text style={[styles.serviceInfoValue, { color: colors.onSurface }]}>
            {service.name}
          </Text>
        </View>
        <View style={styles.serviceInfoRow}>
          <Text style={[styles.serviceInfoLabel, { color: CommonColors.gray[600] }]}>
            Provider:
          </Text>
          <Text style={[styles.serviceInfoValue, { color: colors.onSurface }]}>
            {service.providerName}
          </Text>
        </View>
        <View style={styles.serviceInfoRow}>
          <Text style={[styles.serviceInfoLabel, { color: CommonColors.gray[600] }]}>
            Duration:
          </Text>
          <Text style={[styles.serviceInfoValue, { color: colors.onSurface }]}>
            {service.duration}
          </Text>
        </View>
        <View style={styles.serviceInfoRow}>
          <Text style={[styles.serviceInfoLabel, { color: CommonColors.gray[600] }]}>
            Price:
          </Text>
          <Text style={[styles.serviceInfoPrice, { color: colors.primary }]}>
            {service.currency}{service.price}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: colors.onSurface }]}>
        Payment Method
      </Text>
      
      <View style={styles.paymentMethods}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              {
                backgroundColor: colors.surface,
                borderColor: selectedPayment === method.id ? colors.primary : CommonColors.gray[300],
              }
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <View style={styles.paymentMethodContent}>
              <View style={[styles.paymentIcon, { backgroundColor: colors.background }]}>
                <Ionicons name={method.icon as any} size={20} color={colors.primary} />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={[styles.paymentName, { color: colors.onSurface }]}>
                  {method.name}
                </Text>
                <Text style={[styles.paymentDetails, { color: CommonColors.gray[600] }]}>
                  {method.details}
                </Text>
              </View>
            </View>
            {selectedPayment === method.id && (
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.priceBreakdown, { backgroundColor: colors.surface }]}>
        <Text style={[styles.priceBreakdownTitle, { color: colors.onSurface }]}>
          Price Breakdown
        </Text>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { color: CommonColors.gray[600] }]}>
            Service Fee
          </Text>
          <Text style={[styles.priceValue, { color: colors.onSurface }]}>
            {service.currency}{service.price}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { color: CommonColors.gray[600] }]}>
            Platform Fee
          </Text>
          <Text style={[styles.priceValue, { color: colors.onSurface }]}>
            {service.currency}5
          </Text>
        </View>
        <View style={[styles.priceDivider, { backgroundColor: CommonColors.gray[300] }]} />
        <View style={styles.priceRow}>
          <Text style={[styles.totalLabel, { color: colors.onSurface }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: colors.primary }]}>
            {service.currency}{service.price + 5}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderConfirmationStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.confirmationIcon}>
        <Ionicons name="checkmark-circle" size={64} color={colors.success} />
      </View>
      
      <Text style={[styles.confirmationTitle, { color: colors.onSurface }]}>
        Booking Confirmed!
      </Text>
      
      <Text style={[styles.confirmationSubtitle, { color: CommonColors.gray[600] }]}>
        Your service has been booked successfully
      </Text>

      <View style={[styles.bookingDetails, { backgroundColor: colors.surface }]}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={20} color={colors.primary} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {availableDates.find(d => d.date === selectedDate)?.label} at {selectedTime}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="person" size={20} color={colors.primary} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {service.providerName}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="construct" size={20} color={colors.primary} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {service.name}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="card" size={20} color={colors.primary} />
          <Text style={[styles.detailText, { color: colors.onSurface }]}>
            {service.currency}{service.price + 5} Total
          </Text>
        </View>
      </View>

      <Text style={[styles.confirmationNote, { color: CommonColors.gray[600] }]}>
        You will receive a confirmation email with booking details and the provider's contact information.
      </Text>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'datetime':
        return renderDateTimeStep();
      case 'details':
        return renderDetailsStep();
      case 'payment':
        return renderPaymentStep();
      case 'confirmation':
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'datetime':
        return selectedDate && selectedTime;
      case 'details':
        return address.trim().length > 0;
      case 'payment':
        return selectedPayment;
      default:
        return true;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
          Book Service
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Bottom Actions */}
      {currentStep !== 'confirmation' && (
        <View style={[styles.bottomActions, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.nextButton,
              {
                backgroundColor: canProceed() ? colors.primary : CommonColors.gray[300],
              }
            ]}
            onPress={currentStep === 'payment' ? handleBooking : handleNext}
            disabled={!canProceed()}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 'payment' ? 'Confirm Booking' : 'Continue'}
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
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    ...Typography.heading3,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: 'white',
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  progressIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: Spacing.xs,
  },
  progressLabel: {
    ...Typography.caption,
    textAlign: 'center',
    fontWeight: '500',
  },
  progressLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    zIndex: -1,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  stepTitle: {
    ...Typography.heading3,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    ...Typography.body1,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  dateContainer: {
    gap: Spacing.md,
  },
  dateScroll: {
    marginLeft: -Spacing.lg,
    paddingLeft: Spacing.lg,
  },
  dateCard: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    marginRight: Spacing.md,
    minWidth: 100,
    alignItems: 'center',
  },
  dateText: {
    ...Typography.body2,
    fontWeight: '600',
  },
  timeContainer: {
    gap: Spacing.md,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  timeSlot: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
  },
  timeText: {
    ...Typography.body2,
    fontWeight: '600',
  },
  unavailableText: {
    ...Typography.caption,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  inputLabel: {
    ...Typography.body1,
    fontWeight: '600',
  },
  textInput: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: CommonColors.gray[300],
    ...Typography.body1,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  serviceInfo: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  serviceInfoTitle: {
    ...Typography.heading4,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  serviceInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfoLabel: {
    ...Typography.body2,
  },
  serviceInfoValue: {
    ...Typography.body2,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  serviceInfoPrice: {
    ...Typography.body1,
    fontWeight: '700',
  },
  paymentMethods: {
    gap: Spacing.md,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    ...Shadows.sm,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  paymentName: {
    ...Typography.body1,
    fontWeight: '600',
  },
  paymentDetails: {
    ...Typography.body2,
  },
  priceBreakdown: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  priceBreakdownTitle: {
    ...Typography.heading4,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    ...Typography.body2,
  },
  priceValue: {
    ...Typography.body2,
    fontWeight: '500',
  },
  priceDivider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    ...Typography.body1,
    fontWeight: '600',
  },
  totalValue: {
    ...Typography.heading4,
    fontWeight: '700',
  },
  confirmationIcon: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  confirmationTitle: {
    ...Typography.heading2,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  confirmationSubtitle: {
    ...Typography.body1,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  bookingDetails: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.lg,
    ...Shadows.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  detailText: {
    ...Typography.body1,
    flex: 1,
  },
  confirmationNote: {
    ...Typography.body2,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: Spacing.lg,
  },
  bottomActions: {
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  actionButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    // backgroundColor set dynamically
  },
  nextButtonText: {
    ...Typography.button,
    color: 'white',
    fontWeight: '600',
  },
});