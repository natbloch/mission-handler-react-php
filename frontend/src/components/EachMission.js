import { useMissionContext } from '../hooks/useMissionContext';

const EachMission = ({ mission ,  fetchMissions , setUpdateMission}) => {
  const { dispatch } = useMissionContext()

  const deleteMission = async () => {
    const confirmD = window.confirm("Are you sure you want to delete?");
    if(!confirmD){
      return;
    }
    //Get time (milliseconds since January 1, 1970)
    const nowDate = new Date().getTime();
    //6days in ms = 6*24*60*60*1000 = 518 400 000 ms
    //DueDate in ms
    const duDateMS = new Date(mission.dueDate).getTime();
    console.log(duDateMS);

    //Check that mission to be cancelled is not due in next 6 days
    if(duDateMS < (nowDate + 518400000) && duDateMS > nowDate){
      alert("Missions due in the next 6 days cannot be cancelled");
      return;
    }
    const response = await fetch('/api/missiondelete/', {
      method: 'POST',
      body: JSON.stringify(mission),
    })

    if (response.ok) {
      fetchMissions()
    }
  }

  

  const changeStatus = async () => {
    if(mission.missionStatus == "active"){
      mission.missionStatus = "completed";
    }else{
      mission.missionStatus = "active";
    }

    const response = await fetch('/api/missionstatus/', {
        method: 'POST',
        body: JSON.stringify(mission),
    })

    if (response.ok) {
      fetchMissions()
    }
  }

  return (
    <div className="each-mission">
      <h4>{mission.missionName}</h4>
      <div>        
        <p>Due date: {mission.dueDate}</p>
        <p>Last updated: {mission.lastUpdate}</p>  
      </div>    
      <span className={mission.missionStatus == "active" ? "missionstatus missionstatus-remain" : "missionstatus missionstatus-completed"}>{mission.missionStatus == "active" ? 'remaining' : 'completed' }</span>
      <div className='actionbox'>
        <span className={mission.missionStatus == "active" ? "change-status completed" : "change-status actual"} onClick={changeStatus}>{mission.missionStatus == "active" ? "Mark as completed" : "Reactuate Mission"}</span>
        <span className="delete-mission" onClick={deleteMission}>delete</span>      
        <span className="update-mission" onClick={() => setUpdateMission(mission)}>update</span>
      </div>
    </div>
  )
}

export default EachMission;