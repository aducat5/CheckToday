import * as ActionTypes from './actionTypes';

//Dikkat et setSelectedTask = (value) => {this.setState({selectedTask: this.getTasks().taskObjects[value]});}

//Set Actions
export const setIsFirst = (value) => {
    return {
        type: ActionTypes.SET_ISFIRST,
        value: value
    };
};
export const setUserName = (value) => {
    return {
        type: ActionTypes.SET_USERNAME,
        value: value
    };
};
export const setTasks = (value) => {
    return {
        type: ActionTypes.SET_TASKS,
        value: value
    };
};
export const setSelectedTask = (value) => {
    return {
        type: ActionTypes.SET_SELECTEDTASK,
        value: value
    };
};
export const setSelectedTaskKey = (value) => {
    return {
        type: ActionTypes.SET_SELECTEDTASKKEY,
        value: value
    };
};
export const setModalVisible = (value) => {
    return {
        type: ActionTypes.SET_MODALVISIBLE,
        value: value
    };
};
export const setTaskName = (value) => {
    return {
        type: ActionTypes.SET_TASKNAME,
        value: value
    };
};
