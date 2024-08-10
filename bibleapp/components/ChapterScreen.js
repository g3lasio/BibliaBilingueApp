import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Papa from 'papaparse';

const ChapterScreen = () => {
    const route = useRoute();
    const { book, chapter, version } = route.params;
    const [filteredVerses, setFilteredVerses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCSV = async () => {
        try {
            const response = await fetch('https://drive.google.com/uc?export=download&id=1AO3k7M28jJXYgdp-EPUwo94T89lY5zK4');
            const file = await response.text();

            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const data = results.data;
                    const filtered = data.filter(
                        (item) =>
                            item.Libro === book &&
                            item.Capítulo === chapter &&
                            item[`Texto ${version}`]
                    );
                    setFilteredVerses(filtered);
                    setLoading(false);
                },
            });
        } catch (error) {
            console.error('Error loading CSV', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCSV();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando versículos...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {filteredVerses.length > 0 ? (
                filteredVerses.map((verse, index) => (
                    <Text key={index} style={{ marginBottom: 10 }}>
                        {verse.Versículo}: {verse[`Texto ${version}`]}
                    </Text>
                ))
            ) : (
                <Text>No hay versículos disponibles.</Text>
            )}
        </ScrollView>
    );
};

export default ChapterScreen;
