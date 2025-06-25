// File: C:\Antillas\app\(tabs)\messages.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocationTheme } from '@/contexts/LocationContext';
import { Typography, Spacing, BorderRadius, Shadows, CommonColors } from '@/constants/Colors';

interface Message {
  id: string;
  providerName: string;
  providerImage: string;
  serviceName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  bookingId?: string;
}

interface MessageItemProps {
  message: Message;
  onPress: () => void;
}

function MessageItem({ message, onPress }: MessageItemProps) {
  const { colors } = useLocationTheme();
  
  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = Math.abs(now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.messageItem, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.messageContent}>
        <View style={styles.providerImageContainer}>
          <Image source={{ uri: message.providerImage }} style={styles.providerImage} />
          {message.isOnline && (
            <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
          )}
        </View>
        
        <View style={styles.messageDetails}>
          <View style={styles.messageHeader}>
            <Text style={[styles.providerName, { color: colors.onSurface }]} numberOfLines={1}>
              {message.providerName}
            </Text>
            <Text style={[styles.timestamp, { color: CommonColors.gray[500] }]}>
              {formatTimestamp(message.timestamp)}
            </Text>
          </View>
          
          <Text style={[styles.serviceName, { color: colors.primary }]} numberOfLines={1}>
            {message.serviceName}
          </Text>
          
          <Text 
            style={[
              styles.lastMessage, 
              { 
                color: message.unreadCount > 0 ? colors.onSurface : CommonColors.gray[600],
                fontWeight: message.unreadCount > 0 ? '600' : '400'
              }
            ]} 
            numberOfLines={2}
          >
            {message.lastMessage}
          </Text>
        </View>
        
        <View style={styles.messageActions}>
          {message.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.unreadCount}>
                {message.unreadCount > 99 ? '99+' : message.unreadCount}
              </Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={16} color={CommonColors.gray[400]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MessagesScreen() {
  const { colors } = useLocationTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const mockMessages: Message[] = [
    {
      id: '1',
      providerName: 'Marcus Johnson',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      serviceName: 'Plumbing Service',
      lastMessage: "I'll be there at 2 PM sharp. Please have the area clear so I can access the pipes easily.",
      timestamp: '2024-06-08T13:30:00Z',
      unreadCount: 2,
      isOnline: true,
      bookingId: '1',
    },
    {
      id: '2',
      providerName: 'Sarah Williams',
      providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=150',
      serviceName: 'Interior Design',
      lastMessage: 'Perfect! I love the color scheme you chose. When would you like to schedule the consultation?',
      timestamp: '2024-06-08T11:15:00Z',
      unreadCount: 0,
      isOnline: true,
      bookingId: '2',
    },
    {
      id: '3',
      providerName: 'David Brown',
      providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      serviceName: 'Auto Repair',
      lastMessage: 'Your car is ready for pickup. The issue was with the alternator as suspected.',
      timestamp: '2024-06-08T09:45:00Z',
      unreadCount: 1,
      isOnline: false,
      bookingId: '3',
    },
    {
      id: '4',
      providerName: 'Lisa Garcia',
      providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      serviceName: 'House Cleaning',
      lastMessage: 'Thank you for the great review! I appreciate your business.',
      timestamp: '2024-06-07T16:20:00Z',
      unreadCount: 0,
      isOnline: false,
      bookingId: '4',
    },
    {
      id: '5',
      providerName: 'AI Assistant',
      providerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150',
      serviceName: 'Support',
      lastMessage: "Hi! I'm here to help you find the perfect service provider. What do you need help with today?",
      timestamp: '2024-06-07T10:00:00Z',
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const filteredMessages = mockMessages.filter(message =>
    message.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadCount = mockMessages.reduce((sum, message) => sum + message.unreadCount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Messages</Text>
          {totalUnreadCount > 0 && (
            <Text style={[styles.unreadSummary, { color: colors.primary }]}>
              {totalUnreadCount} unread message{totalUnreadCount > 1 ? 's' : ''}
            </Text>
          )}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="add-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <Ionicons name="search" size={20} color={CommonColors.gray[500]} />
        <TextInput
          style={[styles.searchInput, { color: colors.onSurface }]}
          placeholder="Search messages..."
          placeholderTextColor={CommonColors.gray[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={CommonColors.gray[400]} />
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.quickActionButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Ionicons name="chatbox" size={20} color="white" />
          <Text style={styles.quickActionText}>Ask AI Assistant</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickActionButton, { backgroundColor: colors.secondary }]}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text style={styles.quickActionText}>Emergency Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredMessages.length > 0 ? (
          <View style={styles.messagesList}>
            {filteredMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onPress={() => {}}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={CommonColors.gray[400]} />
            <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>
              {searchQuery ? 'No messages found' : 'No messages yet'}
            </Text>
            <Text style={[styles.emptyDescription, { color: CommonColors.gray[600] }]}>
              {searchQuery 
                ? `No messages match "${searchQuery}". Try a different search term.`
                : "Start a conversation with a service provider or use our AI assistant for help."
              }
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={[styles.startChatButton, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
              >
                <Ionicons name="chatbox" size={20} color="white" />
                <Text style={styles.startChatButtonText}>Chat with AI Assistant</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        activeOpacity={0.8}
      >
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
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
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    ...Typography.heading2,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  unreadSummary: {
    ...Typography.body2,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body1,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  quickActionText: {
    ...Typography.body2,
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100, // Space for FAB
    gap: Spacing.sm,
  },
  messageItem: {
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  messageContent: {
    flexDirection: 'row',
    padding: Spacing.md,
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  providerImageContainer: {
    position: 'relative',
  },
  providerImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: 'white',
  },
  messageDetails: {
    flex: 1,
    gap: Spacing.xs,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    ...Typography.body1,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    ...Typography.caption,
  },
  serviceName: {
    ...Typography.body2,
    fontWeight: '500',
  },
  lastMessage: {
    ...Typography.body2,
    lineHeight: 20,
  },
  messageActions: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadCount: {
    ...Typography.caption,
    color: 'white',
    fontWeight: '600',
    fontSize: 10,
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
  startChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  startChatButtonText: {
    ...Typography.button,
    color: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
});