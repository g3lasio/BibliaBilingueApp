import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const FavoritesScreen = ({ favorites }) => {
    return (
        <ScrollView style={styles.container}>
            {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                    <View key={index} style={styles.verseContainer}>
                        <Text style={styles.title}>{favorite.book} {favorite.chapter}:{favorite.verse}</Text>
                        <Text style={styles.verseText}>{favorite.text}</Text>
                    </View>
                ))
            ) : (
                <Text>No hay favoritos guardados.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    verseContainer: {
        marginBottom: 20,
    },
    verseText: {
        fontSize: 16,
    },
});

export default FavoritesScreen;
