import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { collection, onSnapshot, getDocs, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../config/firebase"
import styleGlobal from "../styles"

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [chatDocId, setChatDocId] = useState(null);
  const handleSend = async () => {
    if (message.trim() !== '') {
      try {
        const chatDocRef = doc(db, 'chats', chatDocId);
        const messageData = {
          from: 'patient',
          date: new Date(),
          message: message,
        };
        await updateDoc(chatDocRef, {
          messages: arrayUnion(messageData),
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const createChatDocument = async () => {
    setLoading(true);
    const chatDB = collection(db, "chats");
    try {
      const querySnapshot = await getDocs(chatDB);
      const numberOfDocuments = querySnapshot.size;
      const docRef = await addDoc(chatDB, {
        status: true,
        created: new Date(),
        patient: numberOfDocuments + 1,
        messages: [{ "from": "doctor", "date": new Date(), "message": "Hai kami telah membaca hasil pradiagnosamu. Adakah hal selain dari fitur Pradiagnosa yang ingin kamu sampaikan?" }]
      });
      setChatDocId(docRef.id);
      const newDocRef = doc(db, 'chats', docRef.id);
      onSnapshot(newDocRef, (snapshot) => {
        const updatedData = snapshot.data();
        setChats(updatedData.messages);
        setLoading(false)
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const unmountComponent = async () => {
    if (chatDocId) {
      const chatDocRef = doc(db, 'chats', chatDocId);
      try {
        await updateDoc(chatDocRef, { status: false });
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  useEffect(() => {
    createChatDocument();
    return () => {
      unmountComponent();
    };
  }, []);

  return (
    <View style={styleGlobal.containerChat}>
      {
        isLoading ? (
          <View style={{ flex: 1 }}>
            <View style={styles.receiver}>
              <Text style={styles.messageText}>Doctor is typing ...</Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <View style={item.from === 'doctor' ? styles.receiver : styles.sender}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
            keyExtractor={(item, i) => i.toString()}
          />
        )
      }
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
    paddingLeft: 8,
    paddingVertical: 8
  },
});

export default ChatPage;
