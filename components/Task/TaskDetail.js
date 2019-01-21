import React from "react";
import {Modal, View, Text, Button, StyleSheet } from "react-native";

const taskDetail = props => {
    let modalContent = null;
    if(props.task != null){
        modalContent = (
            <View style={styles.column}>
                <View style={styles.row}>
                    <Text>{props.task.taskName}</Text>
                </View>
                <View style={styles.row}>
                    <Text>You have {props.task.taskType} this task at {this.unixTimeToDate(props.task.startDate)}</Text>
                </View>
                <View style={styles.row}>
                    <Button title="Cancel Task" onPress={props.onCancel} color="orange"/>
                    <Button title="Delete Task" onPress={props.onDelete} color="red" />
                    <Button title="Close Modal" onPress={props.closeModal} />
                </View>
            </View>
            );
    }
    
    
    return(
        <Modal visible={modalContent != null} animationType="slide" onRequestClose={() => {}}> 
        {modalContent}
        </Modal>
        );
}

unixTimeToDate = (unixTime) => {
    let dateObj = new Date(unixTime);
    let dateString = dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear();
    return dateString;
}

dayDiff = (unixTime1, unixTime2) => {
    let days1 = Math.floor(unixTime1/8.64e7);
    let days2 = Math.floor(unixTime2/8.64e7);
    return days2 - days1;
}

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
}); 

export default taskDetail;