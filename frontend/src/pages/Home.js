import { useState } from 'react';
import { useEffect} from "react";
import { useMissionContext } from '../hooks/useMissionContext';
import EachMission from "../components/EachMission";
import MissionForm from '../components/MissionForm';

const Home = () => {
  const { missions, dispatch } = useMissionContext();
  const [updateMission, setUpdateMission] = useState('');
  const [missionsToShow, setMissionsToShow] = useState('');

  const fetchMissions = async () => {
    const response = await fetch('/api/missions')
    const json = await response.json()
    //const json =  response;
    console.log(json);
    if (response.ok) {
      dispatch({type: 'SET_MISSIONS', payload: json})
    }
    setMissionsToShow(json);
  }

  useEffect(() => {
    fetchMissions()
  }, [dispatch])


  const showCompleted = () => {
    if(missions && missions.length > 0){
      let newArrToShow = missions.filter((mission)=>{
        return mission.missionStatus == "completed";
      });
      setMissionsToShow(newArrToShow);
    }
  }

  const showActive = () => {
    if(missions && missions.length > 0){
      let newArrToShow = missions.filter((mission)=>{
        return mission.missionStatus == "active";
      });
      setMissionsToShow(newArrToShow);
    }
  }

  const showAll = () => {
    if(missions && missions.length > 0){
      setMissionsToShow(missions);
    }
  }

  const showOld = () => {
    if(missions && missions.length > 0){
      var newArrToShow = [...missionsToShow].sort(function(a,b){
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      
      console.log(newArrToShow);
      setMissionsToShow(newArrToShow);
    }
  }

  const showRecent = () => {
    if(missions && missions.length > 0){
      var newArrToShow = [...missionsToShow].sort(function(b,a){
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      console.log(newArrToShow);
      setMissionsToShow(newArrToShow);
    }
  }




  return (
    <div className="home">
      <div className="missions">
        <h3>Missions</h3>
        <div className='statusShow'>
          <div><h5>Filter:</h5><span onClick={showActive}>Active</span><span onClick={showCompleted}>Completed</span><span onClick={showAll}>All</span></div>
          <div><h5>Sort:</h5><span onClick={showRecent}>Recent first</span><span onClick={showOld}>Old first</span></div>
        </div>
        <div>         
          { missionsToShow && missionsToShow.length > 0 ? "" : <h4 className='nomission'>Sorry, No missions to show...</h4>}
          {missionsToShow && missionsToShow.map(mission => (
            <EachMission fetchMissions={fetchMissions} setUpdateMission={setUpdateMission} mission={mission} key={mission.id} />
          ))}
        </div>
      </div>
      <MissionForm fetchMissions={fetchMissions} setUpdateMission={setUpdateMission} updateMission={updateMission} />
    </div>
  )
}

export default Home;