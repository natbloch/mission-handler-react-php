import { createContext,useReducer } from 'react';

export const MissionContext = createContext();

export const missionReducer = (state, action) => {
    switch (action.type){
        case 'SET_MISSIONS':
            return {
                missions: action.payload
            }
        case 'CREATE_MISSION':
            return {
                missions: [action.payload, ...state.missions]
            }
        case 'DELETE_MISSION':
            return {
                missions: state.missions.filter((mission) =>{
                    if(mission.id !== action.payload){ return mission}
                })
            }
        case 'UPDATE_MISSION':
            return {
                missions: state.missions.filter((mission) =>{
                    if(mission.id !== action.payload){ 
                        return mission
                    }else{
                        return action.payload;
                    }
                })
            }
        default:
            return state
    }
}

export const MissionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(missionReducer, {
        missions: null
    })

    return(
        <MissionContext.Provider value={{...state, dispatch}}>
            { children }
        </MissionContext.Provider>
    )
}
