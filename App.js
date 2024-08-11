import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './src/styles';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, deleteObject, list } from "firebase/storage";
import { Ionicons } from '@expo/vector-icons'; // Ícones

const ImagePickerExample = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyA3Kb9CCLDu4xfI9_rmCDLwkEPPTsOFL4c",
    authDomain: "aula-mobile-76f22.firebaseapp.com",
    projectId: "aula-mobile-76f22",
    storageBucket: "aula-mobile-76f22.appspot.com",
    messagingSenderId: "588274377803",
    appId: "1:588274377803:web:74f45262068dddf72b99ce",
    measurementId: "G-GNVSBPGQVC"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getRandom = (max) => {
    return Math.floor(Math.random() * max + 1);
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Selecione uma imagem antes de enviar.');
      return;
    }

    setUploading(true);
    try {
      const name = getRandom(200);
      const imageRef = ref(storage, name + '.jpg');

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      Alert.alert('Imagem enviada com sucesso!');
      setImageUri(null); // Limpa a seleção após o upload
    } catch (error) {
      Alert.alert('Erro ao enviar a imagem:', error.message);
    } finally {
      setUploading(false);
    }
  };

  const LinkImage = async () => {
    const listRef = ref(storage);

    try {
      const firstPage = await list(listRef, { maxResults: 100 });
      const lista = firstPage.items.map(item => {
        return {
          link: 'https://firebasestorage.googleapis.com/v0/b/' + item.bucket + '/o/' + item.fullPath + '?alt=media',
          path: item.fullPath
        };
      });
      setImage(lista);
    } catch (error) {
      Alert.alert('Erro ao listar as imagens:', error.message);
    }
  };

  const deleteImage = async (path) => {
    const imageRef = ref(storage, path);

    try {
      await deleteObject(imageRef);
      Alert.alert('Imagem deletada com sucesso!');
      setImage(image.filter(img => img.path !== path));
    } catch (error) {
      Alert.alert('Erro ao deletar a imagem:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.link }} style={styles.image} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(item.path)}>
        <Ionicons name="trash" size={20} color="white" />
        <Text style={styles.deleteButtonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciador de Imagens</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Pré-visualização</Text>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        </View>
      )}
      
      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={uploadImage} disabled={!imageUri}>
          <Text style={styles.buttonText}>Enviar Imagem</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={LinkImage}>
        <Text style={styles.buttonText}>Ver Imagens</Text>
      </TouchableOpacity>

      <FlatList
        data={image}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={{ marginTop: 10, width: '100%' }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ImagePickerExample;