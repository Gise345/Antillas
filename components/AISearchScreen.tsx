// components/AISearchScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CaymanTheme, JamaicaTheme, CaribbeanDesign, LocationTheme } from '@/constants/CaribbeanColors';

interface AISearchScreenProps {
  location: LocationTheme;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  serviceRecommendations?: ServiceRecommendation[];
}

interface ServiceRecommendation {
  id: string;
  name: string;
  provider: string;
  rating: number;
  price: string;
  image: string;
  category: string;
  availability: string;
}

interface QuickSuggestionProps {
  text: string;
  icon: string;
  onPress: () => void;
}

function QuickSuggestion({ text, icon, onPress }: QuickSuggestionProps) {
  const theme = CaymanTheme.light; // Will be dynamic based on location

  return (
    <TouchableOpacity style={[styles.suggestionChip, { backgroundColor: theme.surface }]} onPress={onPress}>
      <Ionicons name={icon as any} size={16} color={theme.primary} />
      <Text style={[styles.suggestionText, { color: theme.text }]}>{text}</Text>
    </TouchableOpacity>
  );
}

interface ChatBubbleProps {
  message: ChatMessage;
  theme: any;
}

function ChatBubble({ message, theme }: ChatBubbleProps) {
  const isUser = message.type === 'user';
  
  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
      {!isUser && (
        <View style={[styles.aiAvatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.aiAvatarText}>AI</Text>
        </View>
      )}
      
      <View style={[styles.messageBubble, { 
        backgroundColor: isUser ? theme.primary : theme.surface,
        marginLeft: isUser ? 40 : 0,
        marginRight: isUser ? 0 : 40,
      }]}>
        <Text style={[styles.messageText, { 
          color: isUser ? 'white' : theme.text 
        }]}>
          {message.content}
        </Text>
        
        {message.suggestions && message.suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {message.suggestions.map((suggestion, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.inlineSuggestion, { borderColor: theme.primary + '40' }]}
              >
                <Text style={[styles.inlineSuggestionText, { color: theme.primary }]}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {message.serviceRecommendations && message.serviceRecommendations.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
            {message.serviceRecommendations.map((service) => (
              <TouchableOpacity key={service.id} style={[styles.serviceCard, { backgroundColor: theme.background }]}>
                <Image source={{ uri: service.image }} style={styles.serviceImage} />
                <View style={styles.serviceInfo}>
                  <Text style={[styles.serviceName, { color: theme.text }]} numberOfLines={1}>
                    {service.name}
                  </Text>
                  <Text style={[styles.serviceProvider, { color: theme.primary }]} numberOfLines={1}>
                    by {service.provider}
                  </Text>
                  <View style={styles.serviceStats}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={[styles.ratingText, { color: theme.text }]}>{service.rating}</Text>
                    </View>
                    <Text style={[styles.servicePrice, { color: theme.text }]}>{service.price}</Text>
                  </View>
                  <Text style={[styles.serviceAvailability, { color: theme.success }]}>
                    {service.availability}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      
      <Text style={[styles.messageTime, { color: theme.textSecondary }]}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
}

export default function AISearchScreen({ location, onClose }: AISearchScreenProps) {
  const theme = location === 'cayman' ? CaymanTheme.light : JamaicaTheme.light;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const quickSuggestions = [
    { text: 'Find a plumber', icon: 'water-outline' },
    { text: 'House cleaning', icon: 'home-outline' },
    { text: 'Car repair', icon: 'car-outline' },
    { text: 'Photography', icon: 'camera-outline' },
    { text: 'Landscaping', icon: 'leaf-outline' },
    { text: 'Electrician', icon: 'flash-outline' },
  ];

  useEffect(() => {
    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your Antillas AI assistant. I'm here to help you find the perfect service provider in ${location === 'cayman' ? 'Cayman Islands' : 'Jamaica'}. What do you need help with today?`,
      timestamp: new Date(),
      suggestions: ['Find home services', 'Emergency repairs', 'Schedule maintenance', 'Browse categories']
    };
    
    setMessages([welcomeMessage]);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [location]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(text, location);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, location: LocationTheme): ChatMessage => {
    const locationName = location === 'cayman' ? 'Cayman Islands' : 'Jamaica';
    
    // Simple keyword matching for demo
    const input = userInput.toLowerCase();
    
    if (input.includes('plumb') || input.includes('leak') || input.includes('pipe')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `I found several excellent plumbers in ${locationName}. Here are my top recommendations based on ratings, availability, and proximity to you:`,
        timestamp: new Date(),
        serviceRecommendations: [
          {
            id: '1',
            name: 'Emergency Plumbing Repair',
            provider: 'Marcus Johnson',
            rating: 4.9,
            price: location === 'cayman' ? 'CI$120/hr' : 'J$8,500/hr',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&h=100&fit=crop',
            category: 'Plumbing',
            availability: 'Available now'
          },
          {
            id: '2',
            name: 'Pipe Installation & Repair',
            provider: 'Island Plumbing Co.',
            rating: 4.7,
            price: location === 'cayman' ? 'CI$95/hr' : 'J$7,200/hr',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop',
            category: 'Plumbing',
            availability: 'Available today'
          }
        ],
        suggestions: ['Book emergency service', 'Compare prices', 'Read reviews', 'Schedule consultation']
      };
    }
    
    if (input.includes('clean') || input.includes('house') || input.includes('maid')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Great! I've found trusted house cleaning services in ${locationName}. All providers are verified and have excellent customer reviews:`,
        timestamp: new Date(),
        serviceRecommendations: [
          {
            id: '3',
            name: 'Deep House Cleaning',
            provider: 'Caribbean Clean Co.',
            rating: 4.8,
            price: location === 'cayman' ? 'CI$80' : 'J$5,500',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&h=100&fit=crop',
            category: 'Cleaning',
            availability: 'Available tomorrow'
          }
        ],
        suggestions: ['Book weekly cleaning', 'One-time deep clean', 'Compare packages', 'See availability']
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: `I understand you're looking for "${userInput}". Let me search for the best service providers in ${locationName} for you. What specific details can you share about what you need?`,
      timestamp: new Date(),
      suggestions: ['More details', 'Browse categories', 'Emergency service', 'Schedule later']
    };
  };

  const handleSuggestionPress = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient colors={theme.gradient as [string, string, ...string[]]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>Powered by Antillas Intelligence</Text>
          </View>
          <View style={styles.aiIndicator}>
            <View style={styles.aiDot} />
            <Text style={styles.aiStatus}>Online</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <Animated.View style={[styles.quickSuggestionsContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.quickSuggestionsTitle, { color: theme.text }]}>
            Popular requests:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickSuggestions}>
              {quickSuggestions.map((suggestion, index) => (
                <QuickSuggestion
                  key={index}
                  text={suggestion.text}
                  icon={suggestion.icon}
                  onPress={() => handleSendMessage(suggestion.text)}
                />
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} theme={theme} />
        ))}
        
        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={[styles.aiAvatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.aiAvatarText}>AI</Text>
            </View>
            <View style={[styles.typingBubble, { backgroundColor: theme.surface }]}>
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, { backgroundColor: theme.primary }]} />
                <View style={[styles.typingDot, { backgroundColor: theme.primary }]} />
                <View style={[styles.typingDot, { backgroundColor: theme.primary }]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.inputContainer, { backgroundColor: theme.surface }]}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.textInput, { backgroundColor: theme.background, color: theme.text }]}
            placeholder="Ask me anything about services..."
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: theme.primary }]}
            onPress={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.inputHint, { color: theme.textSecondary }]}>
          AI can make mistakes. Verify important information.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: CaribbeanDesign.spacing.lg,
    paddingVertical: CaribbeanDesign.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: CaribbeanDesign.spacing.xs,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
  },
  aiStatus: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  quickSuggestionsContainer: {
    padding: CaribbeanDesign.spacing.lg,
  },
  quickSuggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: CaribbeanDesign.spacing.sm,
  },
  quickSuggestions: {
    flexDirection: 'row',
    gap: CaribbeanDesign.spacing.sm,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.sm,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    gap: CaribbeanDesign.spacing.xs,
    ...CaribbeanDesign.shadows.sm,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: CaribbeanDesign.spacing.lg,
  },
  messageContainer: {
    marginVertical: CaribbeanDesign.spacing.sm,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CaribbeanDesign.spacing.xs,
  },
  aiAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: CaribbeanDesign.spacing.md,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    ...CaribbeanDesign.shadows.sm,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CaribbeanDesign.spacing.xs,
    marginTop: CaribbeanDesign.spacing.sm,
  },
  inlineSuggestion: {
    paddingHorizontal: CaribbeanDesign.spacing.sm,
    paddingVertical: CaribbeanDesign.spacing.xs,
    borderRadius: CaribbeanDesign.borderRadius.sm,
    borderWidth: 1,
  },
  inlineSuggestionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  recommendationsScroll: {
    marginTop: CaribbeanDesign.spacing.md,
  },
  serviceCard: {
    width: 200,
    borderRadius: CaribbeanDesign.borderRadius.md,
    marginRight: CaribbeanDesign.spacing.sm,
    overflow: 'hidden',
    ...CaribbeanDesign.shadows.sm,
  },
  serviceImage: {
    width: '100%',
    height: 100,
  },
  serviceInfo: {
    padding: CaribbeanDesign.spacing.sm,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  serviceProvider: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: '600',
  },
  serviceAvailability: {
    fontSize: 11,
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: CaribbeanDesign.spacing.sm,
  },
  typingBubble: {
    marginLeft: CaribbeanDesign.spacing.sm,
    padding: CaribbeanDesign.spacing.md,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    ...CaribbeanDesign.shadows.sm,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
  },
  inputContainer: {
    padding: CaribbeanDesign.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: CaribbeanDesign.spacing.sm,
    marginBottom: CaribbeanDesign.spacing.xs,
  },
  textInput: {
    flex: 1,
    borderRadius: CaribbeanDesign.borderRadius.lg,
    paddingHorizontal: CaribbeanDesign.spacing.md,
    paddingVertical: CaribbeanDesign.spacing.sm,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHint: {
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});