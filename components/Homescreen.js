import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, ScrollView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Notifications } from 'expo-notifications';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState("#FFFFFF");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const colors = ["#FFCCCC", "#CCFFCC", "#CCCCFF", "#FFFFCC", "#FFCCFF"];

  useEffect(() => {
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable notifications in settings.');
      }
    });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  const handleSaveNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      Alert.alert("Error", "Both title and content are required.");
      return;
    }

    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? { ...note, title, content, tags, color, isFavorite }
          : note
      );
      setNotes(updatedNotes);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        tags,
        color,
        isFavorite,
      };
      setNotes([...notes, newNote]);
    }

    resetModal();
  };

  const resetModal = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setTags([]);
    setColor("#FFFFFF");
    setIsFavorite(false);
    setModalVisible(false);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
    setColor(note.color);
    setIsFavorite(note.isFavorite);
    setModalVisible(true);
  };

  const handleArchiveNote = (noteId) => {
    const noteToArchive = notes.find((note) => note.id === noteId);
    setArchivedNotes([...archivedNotes, noteToArchive]);
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleUnarchiveNote = (noteId) => {
    const noteToUnarchive = archivedNotes.find((note) => note.id === noteId);
    setNotes([...notes, noteToUnarchive]);
    setArchivedNotes(archivedNotes.filter((note) => note.id !== noteId));
  };

  const toggleFavorite = (noteId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (noteId) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setNotes(notes.filter((note) => note.id !== noteId));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderNotes = showArchived
    ? archivedNotes
    : notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
      );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes App</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileIcon}>
          <Ionicons name="person-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search notes..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Toggle between archived and active notes */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowArchived(!showArchived)}
      >
        <Text style={styles.toggleButtonText}>
          {showArchived ? "Show Active Notes" : "Show Archived Notes"}
        </Text>
      </TouchableOpacity>

      {/* Display Notes */}
      <FlatList
        data={renderNotes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.notesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.noteCard, { backgroundColor: item.color }]}
            onPress={() => handleEditNote(item)}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent} numberOfLines={3}>
              {item.content}
            </Text>
            <Text style={styles.noteTags}>
              Tags: {item.tags.join(", ")}
            </Text>
            <View style={styles.noteActions}>
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.favoriteButton}
              >
                <Ionicons
                  name={item.isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color="red"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  showArchived
                    ? handleUnarchiveNote(item.id)
                    : handleArchiveNote(item.id)
                }
              >
                <Ionicons
                  name={showArchived ? "return-up-back" : "archive-outline"}
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteNote(item.id)}
                style={styles.deleteButton}
              >
                <Ionicons
                  name="trash-bin-outline"
                  size={20}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Add New Note Button */}
      <TouchableOpacity
        style={styles.addNoteButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for adding/editing notes */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add/Edit Note</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Note Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.modalContentInput}
            placeholder="Note Content"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <Text style={styles.modalLabel}>Tags (comma separated):</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="e.g. Work, Personal"
            value={tags.join(",")}
            onChangeText={(text) =>
              setTags(text.split(",").map((t) => t.trim()))
            }
          />
          <Text style={styles.modalLabel}>Select Color:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {colors.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.colorOption, { backgroundColor: c }, color === c ? styles.selectedColorOption : null]}
                onPress={() => setColor(c)}
              />
            ))}
          </ScrollView>

          <View style={styles.modalButtonsContainer}>
            <Button title="Save" onPress={handleSaveNote} color="#007BFF" />
            <Button title="Cancel" onPress={resetModal} color="#FF3B30" />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  header: {
    backgroundColor: "#0288D1",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  profileIcon: {
    marginLeft: 10,
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  toggleButton: {
    backgroundColor: "#0288D1",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  notesContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  noteCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  noteTitle: {
    fontWeight: "bold",
  },
  noteContent: {
    color: "#333",
  },
  noteTags: {
    fontSize: 12,
    color: "#777",
  },
  noteActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
  addNoteButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0288D1",
    padding: 15,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalContentInput: {
    marginBottom: 10,
    padding: 10,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalLabel: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  colorOption: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: "#000",
  },
  modalButtonsContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
