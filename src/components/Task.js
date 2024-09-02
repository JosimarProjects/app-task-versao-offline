import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <Text style={styles.desc}>{props.desc}</Text>
            <Text style={styles.date}>{props.estimateAt.toString()}</Text>
            <Text style={styles.date}>{props.doneAt ? props.doneAt.toString() : 'Não concluído'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
    },
    desc: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',  // Cor preta
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',  // Cor preta
    },
});
