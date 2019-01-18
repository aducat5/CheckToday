import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'

const taskItem = (props) => (
    <View style={(props.task.taskType == "quit" && styles.quitTask) || (props.task.taskType == "started" && styles.startTask)}>
        <Text>#{props.taskKey + 1} I {props.task.taskType} {props.task.taskName} at {this.unixTimeToDate(props.task.startDate)} and did not break it for {this.dayDiff(props.task.startDate, Date.now())} days!!</Text>
        <Button color="#ff5d5d" title="x" onPress={props.onDelete}/>
    </View>
);

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