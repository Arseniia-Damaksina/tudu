import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import TodoItemForm from "../forms/TodoItemForm";
import { isDoneTudu, deleteTudu } from "../../events/axiosGlobal";
import { motion } from "framer-motion";
import womanFigure from "../../assets/woman.png";

export default function MiddleSection({ tudu }) {
    const handleDone = async (id) => {
        await isDoneTudu(id);
        window.location.reload();
    };

    const handleDelete = async (id) => {
        await deleteTudu(id);
        window.location.reload();
    };
    // console.log(tudu, "from middle")
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
        <section className="p-4 sm:ml-64 marker:text-gray-600 body-font w-full">
            <div className="container px-5 py-4 mx-auto">
                <div className="flex flex-wrap gap-8 ">
                    {/*paramater ' i ' is added for duration (framer motion) */}
                    {tudu.length > 0 ? (
                        tudu.map((todo, i) => (
                            <motion.div
                                key={todo.id}
                                className=" bg-gray-100 bg-opacity-75 px-8 pt-8 pb-8 rounded-lg overflow-auto text-center relative  "
                                initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.4 }}
                            >
                                {/*Category Area*/}
                                <h2 className="area tracking-widest  overflow-auto  title-font font-medium text-gray-400 mb-1 ">{todo.category}</h2>
                                {/*To Do Area*/}
                                <h1 className="area overflow-auto title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 rounded-lg h-10 m-2">
                                    {todo.ptaskname}
                                </h1>

                                {/*Description Area*/}
                                <div className="area rounded-lg overflow-auto h-10 m-2 bg-white ">{todo.description}</div>

                                {/*Date-Calendar Area*/}
                                <p className="leading-relaxed mb-3">{new Date(todo.duedate).toISOString().slice(0, 10)}</p>

                                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                    {/*Done Button Blue*/}
                                    {todo.isdone ? (
                                        <motion.div
                                            onClick={() => {
                                                handleDone(todo.id);
                                            }}
                                            className="w-full sm:w-auto bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-2 py-2.5 "
                                            initial={{ x: -100 }}
                                            animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                            transition={{ type: "spring", bounce: 0.4, duration: 4 }}
                                        >
                                            <CheckIcon className="w-6 h-6 text-neutral-100" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            onClick={() => {
                                                handleDone(todo.id);
                                            }}
                                            className="w-full sm:w-auto bg-gray-800 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-2 py-2.5"
                                            initial={{ x: -100 }}
                                            animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                            transition={{ type: "spring", bounce: 0.1, duration: 3 }}
                                        >
                                            <CheckIcon className="w-6 h-6 text-neutral-100" />
                                        </motion.div>
                                    )}

                                    {/*Delete button Red*/}
                                    <motion.div
                                        onClick={() => {
                                            handleDelete(todo.id);
                                        }}
                                        className="w-full sm:w-auto bg-gray-800 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-2 py-2.5 "
                                        initial={{ x: -100 }}
                                        animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                        transition={{ type: "spring", bounce: 0.1, duration: 2 }}
                                    >
                                        <XMarkIcon className="h-6 w-6 " />
                                    </motion.div>

                                    {/*Edit Button Gray New*/}
                                    <motion.button
                                        className="w-full sm:w-auto bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center "
                                        initial={{ x: -100 }}
                                        animate={{ x: 0, rotate: [0, 10, -10, 0] }}
                                        transition={{ type: "spring", bounce: 0.1, duration: 1 }}
                                    >
                                        <TodoItemForm todo={todo} tudu={tudu} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <h1 className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-8 rounded-lg overflow-hidden text-center relative">
                            You do not have any todos. Add a tudu.
                        </h1>
                    )}
                </div>
            </div>
            <div className="womanBox w-36 h-96 fixed bottom-0 right-0 ">
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
}
