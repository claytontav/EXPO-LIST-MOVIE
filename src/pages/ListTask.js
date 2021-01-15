import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import * as Notifications from 'expo-notifications';


export default function ListTask(){

    const [task, setTask] = useState([]);
    const Navigation = useNavigation();
    const isFocussed = useIsFocused();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
    });

    function handleNavigateToNewTask() {
        Navigation.navigate('NewTask');
    }

    useEffect(() => {

        if(isFocussed){
            AsyncStorage.getItem('@taks').then( data => {
                setTask(JSON.parse(data));
            })
        }

    }, [isFocussed]);

    //DELETA UM ITEM DO AsyncStorageDB
    function handleTaskDelete(taskId){

        const newTasks = task.filter(item => item.id !== taskId);

        Alert.alert('Excluir Filme', 'Deseja realmente remover o filme da lista', [

            { text: 'Remover da lista', onPress: async ()  => {

                try {
                    await AsyncStorage.setItem('@taks', JSON.stringify(newTasks));
                    setTask(newTasks);
                    return true;
                }
                catch(exception) {
                    console.log('err');
                    return false;
                }

            }  },

            { text: 'Cancel', onPress: () => {  } }
        ]);  

    }

    //MARCAR COMO LIDO ITEM DO AsyncStorageDB
    async function handleTaskRead(taskId){

        const newTasks = task.map(item => {
            if(item.id == taskId){
                item.read = !item.read;               
            }

            if(item.read == true){

                Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Woow!!! 🍿🍿🥤",
                      body: 'Não deixe de adicionar mais filmes a sua lista para assistir mais tarde',
                    },
                    trigger: {
                      seconds: 1,
                    },
                });

            }

            return item;
        });

        try {

            await AsyncStorage.setItem('@taks', JSON.stringify(newTasks));

            setTask(newTasks);

            return true;

        }
        catch(exception) {

            console.log('err');

            return false;

        }

    }


    return(
        <SafeAreaView style={ styles.areaSafe }>
            <View style={styles.container}>            
                    <Text style={styles.title}>Lista de filmes</Text>
                    <Text style={styles.span}>Clique no nome do filme para marcar como assistido</Text>
                    <FlatList 
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={task}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <View style={[ styles.taskContainer, item.read ? styles.taskContainerRead : '' ]}>
                                <TouchableOpacity onPress={ () => handleTaskRead(item.id) }>
                                    <Text style={[ styles.taskItem, item.read ? styles.taskRead : '' ]}>{item.task}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.trashButton} onPress={ () => handleTaskDelete(item.id) } data={item}>
                                    <AntDesign name="delete" size={24} style={ [ styles.btnDelete, item.read ? styles.btnDeleteRead : '' ] } />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigateToNewTask}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 15,
        backgroundColor: '#161a1d',
    },

    areaSafe:{
        flex: 1,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: '#ba181b',
    },

    span: {
        marginBottom: 24,
        color: '#95a5a6',
    },

    taskContainer: {
        marginVertical: 5,
        paddingVertical: 20,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#e56b6f",
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#000',
        shadowOpacity: 1.0,
    }, 

    taskContainerRead: {
        backgroundColor: "#ccc",
    },

    taskItem: {
        flex: 1,
        marginHorizontal: 20,
        fontSize: 16,
        color: '#fff',
    },

    taskRead: {
        textDecorationLine: 'line-through',
        color: '#95a5a6',
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

    trashButton: {
        position: "absolute",
        right: 10,
        zIndex: 9999,
    },

    btnDelete: {
        color: "#fff",
    },

    btnDeleteRead: {
        color: '#ba181b',
    },

  });  