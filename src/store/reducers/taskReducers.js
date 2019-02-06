import * as ActionTypes from "../actions/actionTypes";

const initialState = {
    taskName: "",
    tasks: {
      taskObjects: []
    },
    selectedTask: null,
    selectedTaskKey: null,
    modalVisible: false
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ISFIRST: 
            return {...state, isFirst: action.value};
        case ActionTypes.SET_USERNAME: 
            return {...state, userName: action.value};
        case ActionTypes.SET_TASKS: 
            return {...state, tasks: action.value};
        case ActionTypes.SET_SELECTEDTASK: 
            return {...state, selectedTask: state.tasks.taskObjects[action.value]};
        case ActionTypes.SET_SELECTEDTASKKEY: 
            return {...state, selectedTaskKey: action.value};
        case ActionTypes.SET_MODALVISIBLE: 
            return {...state, modalVisible: action.value};
        case ActionTypes.SET_TASKNAME: 
            return {...state, taskName: action.value};
        
        default:
            return state;
    }
};

export default reducer;