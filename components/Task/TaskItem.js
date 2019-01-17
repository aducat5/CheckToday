import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'

const taskItem = (props) => (
    <View style={(props.task.taskType == "quit" && styles.quitTask) || (props.task.taskType == "started" && styles.startTask)}>
        <Text>#{props.taskKey + 1} I {props.task.taskType} {props.task.taskName} at {props.task.startDate} and did not break it untill now!! </Text>
        <Button color="#ff5d5d" title="x" onPress={props.onDelete}/>
    </View>
);

const styles = StyleSheet.create({
    quitTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 3,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        padding: 5,
        borderColor: 'lightblue'
    },
    
    startTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 3,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        padding: 5,
        borderColor: 'lightgreen'
    } 
});

export default taskItem;