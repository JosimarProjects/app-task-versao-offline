import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Platform, Alert } from "react-native";
import commonStyles from "../commonStyles";
import todayImage from '../../assets/imgs/today.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from "axios";
import { server, showError } from "../common";
import 'moment/locale/pt-br';
import moment from 'moment';
import Task from "../components/Task";
import AddTask from "./AddTask";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks:  []
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            ;
            const res = await Axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
            
        }catch(error) {
            showError(error);
        }
        
    }

    

    componentDidUpdate = async () => {
        await AsyncStorage.setItem('tasksState', JSON.stringify(this.state));
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
    }

    filterTasks = () => {
        let visibleTasks = null;
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = task => task.doneAt == null;
            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({ visibleTasks });
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks:this.state.showDoneTasks
        }));
    }

    toggleTask = async taskId => {
        try{
            await Axios.put(`${server}/tasks/${taskId}/toggle`);
            await this.loadTasks();

        }    catch(error) {
            showError(error);
        }
    
    }

    addTask = async newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!');
            return;
        }

       /* const tasks = [...this.state.tasks];
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        });*/

        try{
            await Axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })
            
            this.setState({ showAddTask: false }, this.loadTasks);

        }catch(error) {
            showError(error);
        }
        
    }

    deleteTask = async taskId => {
       try{
        await Axios.delete(`${server}/tasks/${taskId}`);
        await this.loadTasks();
           
       }catch(error) {
           showError(error);
       }
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

        return (
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}
                />
                <ImageBackground
                    source={todayImage}
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon 
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                                size={27} 
                                color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => (
                            <Task 
                                {...item}
                                onToggleTask={this.toggleTask} 
                                onDelete={this.deleteTask} 
                            />
                        )}
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.addButton}  
                    onPress={() => this.setState({ showAddTask: true })} 
                    activeOpacity={0.7}
                >
                    <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
