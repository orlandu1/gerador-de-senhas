import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ListPasswordProps {
    data: string;
    removePassword: () => void;
}

export const PasswordItem = ({ data, removePassword }: ListPasswordProps) => {

    const [isVisible, setIsVisible] = useState(false);

    const handleVisible = () => {

        if (isVisible) {
            setIsVisible(false);

        } else {
            setIsVisible(true);

        }
    }


    return (
        <Pressable onLongPress={removePassword} style={styles.container}>
            
            {isVisible
                ? <Text style={styles.text}>{data}</Text>
                : <View style={{ backgroundColor: "#FFF", width: "80%", height: "90%", borderRadius: 8 }}></View>
            }

            <Ionicons name={isVisible ? 'eye' : 'eye-off'} size={24} color="white" onPress={handleVisible} />
        </Pressable>
    )
}



const styles = StyleSheet.create({

    container: {
        backgroundColor: "#0e0e0e",
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    text: {
        color: "#FFF",
    }


})