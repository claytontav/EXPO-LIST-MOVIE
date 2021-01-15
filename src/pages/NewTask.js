import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function NewTask(){

    const [input, setInput] = useState('');
    const [task, setTask] = useState([]);

    const Navigation = useNavigation();

    //FUÇÃO PARA SETAR ITENS NO AsyncStorageDB
    async function handleSubmit() {
        if(input === '' && input === undefined) return

        const data = {
          id: input,
          task: input,
          read: false,
        }
        
        setTask(task.push(data));

        await AsyncStorage.setItem('@taks', JSON.stringify(task));

        setInput('');

        Navigation.goBack();

    }

    //PEGAR TODOS ITENS DA VARIAVEL TASK PARA SER PASSADO PARA O METODO PUSH DA FUNÇÃO SUBMIT
    useEffect(() => {
        async function loadTasks() {
            const taskStorage = await AsyncStorage.getItem('@taks')
            if(taskStorage) {
                setTask(JSON.parse(taskStorage))
            }
        }
        loadTasks()
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar filme a lista</Text>
            <TextInput 
                style={styles.inputNewTask} 
                onChangeText={text => setInput(text)}
                defaultValue={input}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 15,
        backgroundColor: '#161a1d',
    },
    
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: '#ba181b'
    },

    header: {
        marginVertical: 24,
        flexDirection: "row",
        alignItems: "center",
    },

    headerBack: {
        fontSize: 14,
        color: "#5158BB",
        marginLeft: 5,
    },

    inputNewTask: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#e56b6f",
        color: '#FDFFFC'
    },

    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: "#ba181b",
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#000',
        shadowOpacity: 1.0,
    },

    buttonText: {
        fontSize: 14,
        color: '#FDFFFC'
    },
  });
  