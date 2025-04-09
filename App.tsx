import { useState } from 'react';

import {View,Button,FlatList,Text,PermissionsAndroid,Platform,StyleSheet} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<any>([]);

  const getContacts = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );

        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Permission denied');
          return;
        }
      }
      console.log('Contacts Module:', Contacts);
      const contactList = await Contacts.getAll();
      setContacts(contactList);
    } catch (err) {
      console.error('Failed to load contacts', err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Load Contacts" onPress={getContacts} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <Text style={styles.contactText}>{item.displayName}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactText: {
    paddingVertical: 4,
    fontSize: 16,
  },
});

export default ContactList;
