import { useState , useEffect} from 'react';
import { useMissionContext } from '../hooks/useMissionContext';

const MissionForm = ({fetchMissions , updateMission , setUpdateMission}) => {
    const { dispatch } = useMissionContext();
    
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState("");
    
    const [missionName, setMissionName] = useState('');    
    const [dueDate, setDueDate] = useState('');
    const [formStatus, setFormStatus] = useState('new');
    const [missionId, setMissionId] = useState('');
 
    
    useEffect(() => {
        if(updateMission){
            setFormStatus("update");
            setMissionId(updateMission.id);
            setDueDate(updateMission.dueDate);
            setMissionName(updateMission.missionName);
        }
    }, [updateMission])
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(missionName.trim() == ""){
            setEmptyFields("missionName");
            return;
        }else if(dueDate.trim() == ""){
            setEmptyFields("dueDate");
            return;
        }

        var path = "newmission";
        if(formStatus == "update"){
            path = "updatemission";
        }
        const mission = {missionName, dueDate, id : missionId};
        const response = await fetch('/api/'+path, {
            method: "POST",
            body: JSON.stringify(mission),
            headers: {
                "Content-Type": "application/json"
            }        
        })

        console.log(response);
        if(!response.ok){
            setError("A problem occurred, the request was not saved");
        }

        if(response.ok){
            fetchMissions();         


           //Reset
            setMissionName('');
            setDueDate('');
            setMissionId('');
            setError('');
            setFormStatus('new');
            setEmptyFields("");
            setUpdateMission('');
        }  
              
    }




    return(
        <form className='missionForm' onSubmit={handleSubmit}>
            <h3>{formStatus == "update" ? "Update Mission" : "Create New Mission"}</h3>
            
            <input
                type="hidden"
                value={missionId}              
            />

            <label>Mission Name</label>
            <input
                type="text"
                onChange={(e) => setMissionName(e.target.value)}
                value={missionName}
                className={emptyFields=='missionName' ? 'error' : ''}                
            />

            <label>Mission Due Date</label>
            <input
                type="date"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
                className={emptyFields=='dueDate' ? 'error' : ''}                
            />

            

            <input type="submit" value= {formStatus == "update" ? "Update" : "Save"} />

            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default MissionForm;

