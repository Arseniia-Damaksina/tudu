import React, { useState } from "react";
import { isDoneTudu, deleteTudu } from "../../events/axiosGlobal";
import TodoItemForm from "../forms/TodoItemForm";
import { motion } from "framer-motion";
import womanFigure from "../../assets/woman.png";

const MainFrame = ({ tudu }) => {
    // mark a tudu as done
    const handleDone = async (id) => {
        await isDoneTudu(id);
        window.location.reload(true);
    };
    // delete a tudu
    const handleDelete = async (id) => {
        await deleteTudu(id);
        window.location.reload(true);
    };
    // women animation
    const [isOpen, setIsOpen] = useState(false);
    let motivations = [
        "Amateurs sit and wait for inspiration, the rest of us just get up and go to work. – Stephen King",
        "Words may show a man’s wit but actions will show his meaning. – Benjamin Franklin",
        "Ordinary people think merely of spending time, great people think of using it. – Arthur Schopenhauer",
        "Take time to deliberate, but when the time for action has arrived, stop thinking and go in. – Napoleon Bonaparte",
        "You see, in life, lots of people know what to do, but few people actually do what they know. Knowing is not enough! You must take action. – Tony Robbins",
        "The key is not to prioritize what’s on your schedule, but to schedule your priorities. – Stephen Covey",
        "If you spend too much time thinking about a thing, you’ll never get it done. – Bruce Lee",
    ];
    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }
    return (
        //sm: 640px screen
        //can i delete marker?
        <section className="p-4 sm:ml-64 marker:text-gray-600 body-font w-full">
            <table className="w-full text-md text-slate-600 bg-gray-100 shadow-md rounded mb-4 ">
                <tbody>
                    <tr className="border-b ">
                        <th className="titles text-left p-3 px-5">
                            <p>Title</p>
                        </th>
                        <th className="category-column text-left p-3 px-5">
                            <p>Category</p>
                        </th>
                        <th className="description-column text-left p-3 px-5">
                            <p>Description</p>
                        </th>
                        <th className="text-left p-3 px-5">
                            <p>Due-Date</p>
                        </th>
                        {/* can i delete this part ? */}
                        {/* <th class="text-left p-3 px-5">End-Date</th> */}
                        {/* can i delete this part ? */}
                        <th></th>
                    </tr>
                    {tudu.length > 0 ? (
                        tudu.map((todo) => (
                            <tr key={todo.id} className="border-b hover:bg-blue-50 bg-white">
                                <motion.td className="title-column p-3 px-5 max-w-xs" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    {todo.ptaskname}
                                </motion.td>
                                <motion.td className="category-column p-3 px-5 max-w-xs" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    {todo.category}
                                    {/* can i delete this part ? */}
                                    {/* <select value="user.role" class="bg-transparent">
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select> */}
                                </motion.td>
                                <motion.td className="description-column p-3 px-5 max-w-xs " whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    {" "}
                                    {todo.description}
                                </motion.td>

                                <motion.td className="p-3 px-5 max-w-xs" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    {new Date(todo.duedate).toISOString().slice(0, 10)}
                                </motion.td>
                                <td className="buttonArea p-3 ">
                                    {todo.isdone ? (
                                        <motion.button
                                            onClick={() => {
                                                handleDone(todo.id);
                                            }}
                                            type="button"
                                            className="mr-3 p-2.5 text-sm  bg-cyan-600  text-white  rounded focus:outline-none focus:shadow-outline"
                                            initial={{ x: -100 }}
                                            animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                            transition={{ type: "spring", bounce: 0.1, duration: 4 }}
                                        >
                                            Done
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            onClick={() => {
                                                handleDone(todo.id);
                                            }}
                                            type="button"
                                            className="mr-3 p-2.5 text-sm  bg-gray-600 hover:bg-cyan-400 text-white rounded focus:outline-none focus:shadow-outline"
                                            initial={{ x: -100 }}
                                            animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                            transition={{ type: "spring", bounce: 0.1, duration: 3 }}
                                        >
                                            Done
                                        </motion.button>
                                    )}
                                    <motion.button
                                        onClick={() => {
                                            handleDelete(todo.id);
                                        }}
                                        type="button"
                                        className="mr-3 p-2.5 text-sm bg-red-500 hover:bg-red-700 text-white rounded focus:outline-none focus:shadow-outline"
                                        initial={{ x: -100 }}
                                        animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                        transition={{ type: "spring", bounce: 0.1, duration: 2 }}
                                    >
                                        Delete
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className="mr-3  text-sm bg-gray-800 hover:bg-cyan-600 text-white  rounded focus:outline-none focus:shadow-outline"
                                        initial={{ x: -100 }}
                                        animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                        transition={{ type: "spring", bounce: 0.1, duration: 1 }}
                                    >
                                        <TodoItemForm todo={todo} tudu={tudu} />
                                    </motion.button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                <p> No tudu task</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="womanBox w-36 h-96 fixed bottom-0 right-0 hidden md:block ">
                <motion.div
                    transition={{ layout: { duration: 1, type: "spring" } }}
                    layout
                    onClick={() => setIsOpen(!isOpen)}
                    className="womanBoxStyle rounded-lg shadow-lg absolute bottom-28 right-28  hover:shadow-blue-500/50"
                >
                    <p className=" text-slate-600 text-center font-bold">
                        Get <a className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 "> motivated</a> with
                        one click!
                    </p>

                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                            className="expand indent-8

                      "
                        >
                            <p className="w-64 text-slate-500 ">{motivations[randomNumber(motivations.length)]}</p>
                        </motion.div>
                    )}
                </motion.div>
                <img className="full w-36  hover:grayscale-0 absolute bottom-5 right-5" src={womanFigure} alt="woman_figure" />
            </div>
        </section>
    );
};
// category,description,duedate,entrydate,id,place,ptaskname,style,url,user_id

export default MainFrame;
