// app/(tabs)/messages.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocationTheme } from '@/contexts/LocationContext';
import { CaribbeanDesign } from '@/constants/CaribbeanColors';
import AISearchScreen from '@/components/AISearchScreen';

interface Message {
  id: string;
  providerName: string;
  providerImage: string;
  serviceName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isAI?: boolean;
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
        <View style={styles.avatarContainer}>
          {message.isAI ? (
            <LinearGradient
              colors={colors.gradient as [string, string, ...string[]]}
              style={styles.aiAvatar}
            >
              <Ionicons name="sparkles" size={20} color="white" />
            </LinearGradient>
          ) : (
            <Image source={{ uri: message.providerImage }} style={styles.avatar} />
          )}
          {message.isOnline && !message.isAI && (
            <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
          )}
        </View>
        
        <View style={styles.messageDetails}>
          <View style={styles.messageHeader}>
            <Text style={[styles.providerName, { color: colors.text }]} numberOfLines={1}>
              {message.providerName}
            </Text>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
              {formatTimestamp(message.timestamp)}
            </Text>
          </View>
          
          {!message.isAI && (
            <Text style={[styles.serviceName, { color: colors.primary }]} numberOfLines={1}>
              {message.serviceName}
            </Text>
          )}
          
          <Text 
            style={[
              styles.lastMessage, 
              { 
                color: message.unreadCount > 0 ? colors.text : colors.textSecondary,
                fontWeight: message.unreadCount > 0 ? '600' : 'normal'
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
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MessagesScreen() {
  const { colors, location } = useLocationTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);

  const mockMessages: Message[] = [
    {
      id: 'ai-assistant',
      providerName: 'Antillas AI Assistant',
      providerImage: '',
      serviceName: '',
      lastMessage: "Hi! I'm here to help you find the perfect service provider. What do you need help with today?",
      timestamp: '2024-03-15T10:00:00Z',
      unreadCount: 0,
      isOnline: true,
      isAI: true,
    },
    {
      id: '1',
      providerName: 'Marcus Johnson',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      serviceName: 'Plumbing Service',
      lastMessage: "I'll be there at 2 PM sharp. Please have the area accessible so I can start the repair immediately.",
      timestamp: '2024-03-15T13:30:00Z',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      providerName: 'Sarah Williams',
      providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b5da2c79?w=50&h=50&fit=crop&crop=face',
      serviceName: 'Interior Design',
      lastMessage: 'Perfect! I love the color scheme you chose. When would you like to schedule the consultation?',
      timestamp: '2024-03-15T11:15:00Z',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '3',
      providerName: 'David Brown',
      providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      serviceName: 'Auto Repair',
      lastMessage: 'Your car is ready for pickup. The issue was with the alternator as we discussed.',
      timestamp: '2024-03-15T09:45:00Z',
      unreadCount: 1,
      isOnline: false,
    },
    {
      id: '4',
      providerName: 'Lisa Garcia',
      providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      serviceName: 'House Cleaning',
      lastMessage: 'Thank you for the excellent review! I appreciate your business and look forward to working with you again.',
      timestamp: '2024-03-14T16:20:00Z',
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const filteredMessages = mockMessages.filter(message =>
    message.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadCount = mockMessages.reduce((sum, message) => sum + message.unreadCount, 0);

  const handleMessagePress = (message: Message) => {
    if (message.isAI) {
      setShowAIChat(true);
    } else {
      // Navigate to individual chat screen
      console.log('Open chat with:', message.providerName);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Messages</Text>
            {totalUnreadCount > 0 && (
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>{totalUnreadCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.headerSubtitle}>
            Chat with service providers and get instant help
          </Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsScroll}>
          <TouchableOpacity 
            style={[styles.quickActionButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowAIChat(true)}
          >
            <Ionicons name="sparkles" size={18} color="white" />
            <Text style={styles.quickActionText}>Ask AI Assistant</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.success }]}>
            <Ionicons name="call" size={18} color="white" />
            <Text style={styles.quickActionText}>Emergency Contact</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.secondary }]}>
            <Ionicons name="people" size={18} color="white" />
            <Text style={styles.quickActionText}>Group Services</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredMessages.length > 0 ? (
          <View style={styles.messagesList}>
            {filteredMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onPress={() => handleMessagePress(message)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="chatbubbles-outline" size={48} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {searchQuery ? 'No messages found' : 'No conversations yet'}
            </Text>
            <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
              {searchQuery 
                ? `No messages match "${searchQuery}". Try a different search term.`
                : "Start a conversation with a service provider or chat with our AI assistant for help finding services."
              }
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={[styles.startChatButton, { backgroundColor: colors.primary }]}
                onPress={() => setShowAIChat(true)}
              >
                <Ionicons name="sparkles" size={20} color="white" />
                <Text style={styles.startChatButtonText}>Chat with AI Assistant</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* AI Chat Modal */}
      <Modal
        visible={showAIChat}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <AISearchScreen 
          location={location} 
          onClose={() => setShowAIChat(false)} 
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: CaribbeanDesign.spacing.md,
    paddingBottom: CaribbeanDesign.spacing.xl,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    borderBottomLeftRadius: CaribbeanDesign.borderRadius.xl,
    borderBottomRightRadius: CaribbeanDesign.borderRadius.xl,
  },
  headerContent: {
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: CaribbeanDesign.spacing.xs,
    gap: CaribbeanDesign.spacing.sm,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerAction: {
    padding: CaribbeanDesign.spacing.xs,
  },
  searchSection: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    paddingVertical: CaribbeanDesign.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.md,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.md,
    ...CaribbeanDesign.shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  quickActionsSection: {
    paddingVertical: CaribbeanDesign.spacing.sm,
  },
  quickActionsScroll: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CaribbeanDesign.spacing.sm,
    paddingHorizontal: CaribbeanDesign.spacing.md,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    marginRight: CaribbeanDesign.spacing.sm,
    gap: CaribbeanDesign.spacing.xs,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  messagesList: {
    padding: CaribbeanDesign.spacing.lg,
    gap: CaribbeanDesign.spacing.sm,
  },
  messageItem: {
    borderRadius: CaribbeanDesign.borderRadius.lg,
    ...CaribbeanDesign.shadows.sm,
  },
  messageContent: {
    flexDirection: 'row',
    padding: CaribbeanDesign.spacing.md,
    alignItems: 'flex-start',
    gap: CaribbeanDesign.spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  messageDetails: {
    flex: 1,
    gap: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageActions: {
    alignItems: 'center',
    gap: CaribbeanDesign.spacing.sm,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
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
  startChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CaribbeanDesign.spacing.md,
    paddingHorizontal: CaribbeanDesign.spacing.xl,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.sm,
  },
  startChatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});