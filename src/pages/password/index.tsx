import useStorage from "@/src/hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PasswordItem } from "./components/passwordItem";

export function Passwords() {

    const [listPasswords, setListPasswords] = useState<string[]>([]);
    const focused = useIsFocused();
    const { getItem, saveItem, removeItem } = useStorage();


    useEffect(() => {

        async function loadPasswords() {

            const passwords = await getItem("@pass");
            setListPasswords(passwords);

        }

        loadPasswords();
    }, [focused])


    const handleDeletePassword = async (item: string) => {

        const passwords = await removeItem("@pass", item);

        if (passwords) {
            setListPasswords(passwords);
        } else {
            setListPasswords([]);
        }
    }


    const confirmDelete = (item: string) => {
        Alert.alert(
            'Excluir senha',
            'Tem certeza que deseja remover esta senha?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () => handleDeletePassword(item),
                },
            ]
        );
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Minhas Senhas
                </Text>
            </View>

            <View style={styles.content}>

                <FlatList style={{ flex: 1, paddingTop: 14, }}
                    data={listPasswords}
                    keyExtractor={(item) => String(item)}
                    renderItem={({ item }) => <PasswordItem data={item}
                        removePassword={() => confirmDelete(item)} />
                    }
                />

            </View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    header: {
        backgroundColor: "#392de9",
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    title: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,

    }


})