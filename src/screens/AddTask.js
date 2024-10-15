import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Modal, TouchableOpacity, Platform } from "react-native";
import commonStyles from "../commonStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const initialState = {
    desc: '',
    date: new Date(),
    showDatePicker: false
}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        if(this.props.onSave){
            this.props.onSave(newTask)
            this.setState({ ...initialState })
        }
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode="date"
        >
        </DateTimePicker>

        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}

                </View>
            )



        }
        return datePicker
    }
    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType="slide" onRequestClose={this.props.onCancel}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>
                        <View style={styles.container}>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={[styles.header, {backgroundColor: this.props.color}]}>Nova Tarefa</Text>
                    <TextInput style={styles.input} contextMenuHidden={true} placeholder="Informe a descrição" value={this.state.desc} onChangeText={desc => this.setState({ desc })}></TextInput>
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={[styles.button, {color: this.props.color}]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={[styles.button, {color: this.props.color}]}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>
                        <View style={styles.container}>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',

    },
    header: {
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 50, // Aumentar a altura para mais espaço
        margin: 15,
        paddingHorizontal: 15, // Adicionar padding para dar espaço ao texto
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#ccc', // Cor da borda mais suave
        borderRadius: 10, // Bordas mais arredondadas
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        color: 'black'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }


});
