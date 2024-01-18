import { useEffect, useState } from "react";
import { GetTodos } from "../events/axiosGlobal";
import Cookies from "js-cookie";
import Sidebar from "../Components/main/Sidebar";
import MiddleSection from "../Components/main/MiddleSection";
import MainFrame from "../Components/main/MainFrame";
import HeaderDashboard from "../Components/header/headerDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = Cookies.get("id");
  //     setTudu(await GetTodos(data));
  //     setUpcomingArray(await GetTodos(data));

  //   }
  //   fetchData();
  // }, []);
  // return (
  //   <div>
  //     <HeaderDashboard tudu={tudu} />
  //     <div className="flex">
  //       <Sidebar
  //         tudu={tudu}
  //         setTudu={setTudu}
  //         view={view}
  //         setView={setView}
  //         upcomingArray={upcomingArray}
  //       />
  //       {view ? (
  //         <MiddleSection tudu={tudu} setTudu={setTudu} />
  //       ) : (
  //         <MainFrame tudu={tudu} setTudu={setTudu} />
  //       )}
  //     </div>
  //   </div>
  // );

    // get all tudu from back end store it here. even filtered tudu is stored here
    const [tudu, setTudu] = useState([]);
    const [upcomingArray, setUpcomingArray] = useState([]);
    const [view, setView] = useState(localStorage.getItem('view') === 'true' || true);
    const userId = Cookies.get('id');
    const [options, setOptions] = useState([])
    const navigate = useNavigate()


    // eslint-disable-next-line
    useEffect(() => {

        if(userId==undefined) navigate('/')
        async function fetchData() {
            setTudu(await GetTodos(userId));
            setUpcomingArray(await GetTodos(userId));
            console.log(tudu.length > 0)
            if (tudu.length > 0) {
                // console.log('here I am')
                const newArray = tudu.map((obj) => {
                    return { category: obj.category };
                });
                const categoryArray = [...new Set(newArray.map((item) => item.category))];
                setOptions(categoryArray.map((item) => {
                    return {
                        value: item,
                        label: item,
                    };
                }))
                // console.log(newArray, "newArray", categoryArray, "catArray")
                // console.log(options, "options")
            }
            else {
                // console.log('but I am also here')
                setOptions([{ value: 'Personal', label: 'Personal' }, { value: 'Buisiness', label: 'Buisiness' }])
            }           
        }
        fetchData();
        if (localStorage.getItem('view') !== null) {
            setView(localStorage.getItem('view') === 'true');
        }
    }, [userId]);

    const toggleView = () => {
        const newView = !view;
        setView(newView);
        localStorage.setItem('view', newView);
    };


    return (
        <div>
        <HeaderDashboard tudu={tudu} options={options}/>
        <div className="flex">
            <Sidebar tudu={tudu} setTudu={setTudu}  view={view} toggleView={toggleView} upcomingArray={upcomingArray}/>
            {view ? 
                (<MiddleSection tudu={tudu} setTudu={setTudu}  />) : (<MainFrame tudu={tudu} setTudu={setTudu} />)
            }
        </div>
        </div>
    );
};

export default Dashboard;