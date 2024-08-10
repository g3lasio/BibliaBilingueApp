import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const booksOfBible = {
    "Génesis": 50, "Éxodo": 40, "Levítico": 27, "Números": 36, "Deuteronomio": 34,
    "Josué": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24, 
    "1 Reyes": 22, "2 Reyes": 25, "1 Crónicas": 29, "2 Crónicas": 36,
    "Esdras": 10, "Nehemías": 13, "Ester": 10, "Job": 42, "Salmos": 150, 
    "Proverbios": 31, "Eclesiastés": 12, "Cantares": 8, "Isaías": 66, 
    "Jeremías": 52, "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12, 
    "Oseas": 14, "Joel": 3, "Amós": 9, "Abdías": 1, "Jonás": 4, 
    "Miqueas": 7, "Nahúm": 3, "Habacuc": 3, "Sofonías": 3, "Hageo": 2, 
    "Zacarías": 14, "Malaquías": 4, "Mateo": 28, "Marcos": 16, 
    "Lucas": 24, "Juan": 21, "Hechos": 28, "Romanos": 16, 
    "1 Corintios": 16, "2 Corintios": 13, "Gálatas": 6, "Efesios": 6, 
    "Filipenses": 4, "Colosenses": 4, "1 Tesalonicenses": 5, 
    "2 Tesalonicenses": 3, "1 Timoteo": 6, "2 Timoteo": 4, "Tito": 3, 
    "Filemón": 1, "Hebreos": 13, "Santiago": 5, "1 Pedro": 5, 
    "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1, "3 Juan": 1, "Judas": 1, 
    "Apocalipsis": 22
};

export default function HomeScreen({ navigation }) {
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('Tzotzil');

    const handleNavigate = () => {
        if (selectedBook && selectedChapter && selectedVersion) {
            navigation.navigate('Chapter', {
                book: selectedBook,
                chapter: selectedChapter,
                version: selectedVersion
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Biblia Bilingüe</Text>
            <Picker
                selectedValue={selectedBook}
                onValueChange={(itemValue) => {
                    setSelectedBook(itemValue);
                    setSelectedChapter(''); // Reset chapter when book changes
                }}
                style={styles.picker}
            >
                <Picker.Item label="Seleccionar libro" value="" />
                {Object.keys(booksOfBible).map((book) => (
                    <Picker.Item key={book} label={book} value={book} />
                ))}
            </Picker>

            {selectedBook ? (
                <Picker
                    selectedValue={selectedChapter}
                    onValueChange={(itemValue) => setSelectedChapter(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Seleccionar capítulo" value="" />
                    {Array.from({ length: booksOfBible[selectedBook] }, (_, i) => (
                        <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                    ))}
                </Picker>
            ) : null}

            <Picker
                selectedValue={selectedVersion}
                onValueChange={(itemValue) => setSelectedVersion(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Tzotzil" value="Tzotzil" />
                <Picker.Item label="Español" value="Español" />
                <Picker.Item label="Ingles" value="Ingles" />
            </Picker>

            <Button title="IR" onPress={handleNavigate} disabled={!selectedBook || !selectedChapter} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    picker: {
        width: '100%',
        height: 50,
        marginBottom: 20,
    },
});
