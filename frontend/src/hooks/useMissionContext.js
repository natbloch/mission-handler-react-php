import { MissionContext } from "../context/MissionContext";
import { useContext } from 'react';

export const useMissionContext = () => {
    const context = useContext(MissionContext);

    if(!context){
        throw Error('useMissionContext must be used inside a MissionContextProvider')
    }

    return context;
}
