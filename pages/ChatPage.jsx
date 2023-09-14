import React, { useState, useRef } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, id: messages.length }]);
      setMessage('');
      // Scroll to the end of the FlatList when a new message is sent
      flatListRef.current.scrollToEnd();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={item.id % 2 === 0 ? styles.sender : styles.receiver}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Kirim Pesan" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
    maxWidth: '70%',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
  },
});

export default ChatPage;
