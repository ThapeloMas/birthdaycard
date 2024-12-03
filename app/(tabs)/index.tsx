import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import WheelColorPicker from "react-native-wheel-color-picker";
import * as ImagePicker from "expo-image-picker";

const App: React.FC = () => {
  const [cardText, setCardText] = useState<string>("Happy Birthday!");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log("Image selection was canceled.");
    }
  };

  const handleColorSelection = (color: string): void => {
    setTextColor(color);
    
  };

  const toggleColorPicker = (): void => {
    setShowColorPicker((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Birthday Card 🎉</Text>

      {/* Card Canvas */}
      <View style={styles.card}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.cardImage} />
        )}
        <Text style={[styles.cardText, { color: textColor }]}>{cardText}</Text>
      </View>

      {/* Text Input */}
      <TextInput
        style={styles.input}
        value={cardText}
        onChangeText={setCardText}
        placeholder="Enter your message..."
        placeholderTextColor="#aaa"
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleColorPicker}>
          <Text style={styles.buttonText}>Change Text Color</Text>
        </TouchableOpacity>
      </View>

      {/* Wheel Color Picker */}
      {showColorPicker && (
        <View style={styles.colorPickerContainer}>
          <WheelColorPicker
            color={textColor}
            onColorChangeComplete={handleColorSelection}
          />
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    height: 300,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    zIndex: -1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  colorPickerContainer: {
    height: 250,
    marginTop: 20,
  },
});
