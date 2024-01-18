import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  filteringTuduCategory,
  GetTodos,
  filteringTuduActive,
} from "../../events/axiosGlobal";
import {
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  RectangleGroupIcon,
  StarIcon,
  TagIcon,
  BellAlertIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

// import { set } from "react-hook-form";

const Sidebar = ({ tudu, setTudu, view, setView, toggleView, upcomingArray }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [uniqueArray, setUniqueArray] = useState([]);
  const [finalCategory, setFinalCategory] = useState([]);

  const handleOpen = () => {
    setOpen(!open);
  };
  //display tudu
  const navigate = useNavigate();
  useEffect(() => {
    categoryFunction();
  }, [tudu]);

  //get all-tudu
  async function fetchData() {
    const data = Cookies.get("id");
    setTudu(await GetTodos(data));
  }

  //filtering the tudu
  function categoryFunction() {
    if (tudu.length > 0) {
      const newArray = tudu.map((obj) => {
        return { id: obj.id, category: obj.category };
      });

      const uniqueArray = [...new Set(newArray.map((item) => item.category))];
      setUniqueArray(uniqueArray);
      if (finalCategory.length < uniqueArray.length)
        setFinalCategory(uniqueArray);
    }
  }

  // category filter
  const handleClick = async (item) => {
    // console.log("Clicked item key:", item);
    const filterValue = await filteringTuduCategory(item);
    // console.log(filterValue, "sidebar filter category");
    setTudu(filterValue);
  };

  // Upcoming filter

  const filteringUpcoming = async () => {
    console.log(upcomingArray, "tudutoupdate");
    const tuduUpcoming = [...upcomingArray].sort(
      (a, b) => new Date(a.duedate) - new Date(b.duedate)
    );
    const finalUpcomming = tuduUpcoming.filter(array =>array.isdone === false)
    console.log(finalUpcomming, "upcoming");
    setTudu(finalUpcomming);
  };

  // Active & done filter
  const filteringTuduActif = async (data) => {
    // console.log("Clicked item key:", data);
    const filterValue = await filteringTuduActive(data);
    // console.log(filterValue, "sidebar filter category");
    setTudu(filterValue);
  };


  return (
    <div className="">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 pt-24 overflow-y-auto bg-gray-800 border-gray-700 flex flex-col justify-between">
          <ul>
            <li>
              {" "}
              <motion.span
                className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-sky-700 "
                type="span"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleView}
              >
                <RectangleGroupIcon className="w-6 h-6 text-gray-300" />
                <span className="flex-1 ml-3 whitespace-nowrap "> View</span>
              </motion.span>
            </li>
          </ul>

          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 grow">
            {/*Change View Button*/}


            {/*All Area*/}
            <li
              onClick={() => {
                fetchData();
                console.log(tudu, "onclick sidebar");
              }}
            >
              <motion.span
                className="flex items-center p-2 font-normal text-white rounded-lg hover:bg-sky-700 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArchiveBoxIcon className="w-6 h-6 text-cyan-300" />

                <span className="flex-1 ml-3 whitespace-nowrap">All</span>
                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                  {constantTudu.length}
                </span> */}
              </motion.span>
            </li>

            {/*Active Area*/}
            <li onClick={() => filteringTuduActif(false)}>
              <motion.span
                className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-sky-700 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <StarIcon className="w-6 h-6 text-cyan-300" />
                <span className="flex-1 ml-3 whitespace-nowrap">Active</span>
                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                  
                </span> */}

              </motion.span>
            </li>

            {/*Upcoming Area*/}
            <li onClick={() => filteringUpcoming()}>
              <motion.span
                className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-sky-700  "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CalendarDaysIcon className="w-6 h-6 text-cyan-300" />
                <span className="flex-1 ml-3 whitespace-nowrap">Upcoming</span>
                <button className="relative">
                  <BellAlertIcon data-tooltip-target="tooltip-no-arrow" className="  w-6 h-6 text-cyan-300" />
                  
                  <div
                    className="absolute top-0 right-0  z-10 inline-block translate-x-2/4 translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2 text-xs">
                  </div>
                  <div id="tooltip-no-arrow" role="tooltip" className="absolute z+50 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Tooltip content
                    </div>
                </button>
                

              </motion.span>
            
            </li>

            {/*Done Area*/}
            <li onClick={() => filteringTuduActif(true)}>
              <motion.span
                className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-sky-700 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CheckCircleIcon className="w-6 h-6 text-cyan-300" />

                <span className="flex-1 ml-3 whitespace-nowrap">Done</span>
              </motion.span>
            </li>

            {/*Category & Tags Area*/}
            <li>
              <motion.span
                className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-sky-700  "
                onClick={handleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <TagIcon className="w-6 h-6 text-cyan-300" />

                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
              </motion.span>
              {open ? (
                <ul>
                  {finalCategory.length > 0 ? (
                    finalCategory.map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-center pl-8 text-base font-normal text-white rounded-lg hover:bg-gray-700 "
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleClick(item)}
                      >
                        <ChevronRightIcon className="w-6 h-6 text-yellow-300" />
                        <span className="flex- mr-14 whitespace-nowrap p-2 text-base font-normal">
                          {item}
                        </span>
                      </motion.li>
                    ))
                  ) : (
                    <span className="flex- mr-14 whitespace-nowrap p-2 text-base font-normal">
                      No Category
                    </span>
                  )}
                </ul>
              ) : (
                <p></p>
              )}
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 ">
            {/*Sign Out span*/}
            <li>
              {" "}
              <motion.span
                className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-red-800 "
                type="span"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    Cookies.remove('id',"email","token")
                    navigate("/");
                }}
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6 text-gray-300" />
                <span className="flex-1 ml-3 whitespace-nowrap ">
                  {" "}
                  Sign Out
                </span>
              </motion.span>
            </li>
          </ul>
        </div>
      </aside>
      {/* <div className="p-4 sm:ml-64"></div> */}
    </div>
  );
};
export default Sidebar;