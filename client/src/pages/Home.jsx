import perso from "../assets/homeAssets/perso.png";
import cardLeft from "../assets/homeAssets/squareOne.png";
import cardRight from "../assets/homeAssets/squareTwo.png";
import blueBubble from "../assets/homeAssets/blueBubble.png";
import redBubble from "../assets/homeAssets/redBubble.png";
import pen from "../assets/homeAssets/pen.png";
import note from "../assets/homeAssets/note.png";
import calendar from "../assets/homeAssets/calendar.png";
import logo from "../assets/logo_3d.png"

import { motion, useMotionValue, useTransform} from "framer-motion";

// import { useNavigate } from "react-router-dom";
const HomePageDesktop = () => {
    // const navigate = useNavigate();

    const x = useMotionValue(400);
    const y = useMotionValue(400);


    const rotateX = useTransform(y, [0, 400], [30, -30]);
    const rotateY = useTransform(x, [0, 400], [-30, 30]);
    const translateX = useTransform(y, [0, 400], [45, -45]);
    const translateY = useTransform(x, [0, 400], [-45, 45]);
    const translateX2 = useTransform(y, [400, 0], [30, -30]);
    const translateY2 = useTransform(x, [400, 200], [-30, 30]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    return (
        // <div>
        //      <div className='flex'>
        //     <button className='flex p-2 border-2 border-primary' onClick={() => {navigate('/login')}}>Login</button>
        //     </div>
        //     {/*  */}

        // </div>
        <div 
            onMouseMove={handleMouse} 
            style={{perspective: 400}} 
            className='w-full max-h-full'>
            <motion.div 
                className="hidden md:grid grid-cols-8 grid-rows-5 w-full max-h-screen h-fit overflow-hidden container mx-auto z-[1]"
            >
                {/* grid principale à diviser en 8 colones et 14 lignes */}
                <div className='aspect-square col-start-1 col-end-4 row-start-1 row-end-2 grid grid-cols-6 grid-rows-6 z-[1]'>
                    <img src={cardLeft} alt="" className='z-10 rotate-90 scale-75 col-start-2 col-end-7 row-start-2 row-end-6 ' />
                    <h2 className='z-10 col-start-3 col-end-5 translate-x-5 row-start-4 -translate-y-4 xl:-translate-y-8 xxl:-translate-y-16 xxl:-translate-x-4 flex justify-center items-center text-center'>A fun way to keep track of your tasks</h2>
                </div>

                <div className='aspect-square col-start-6 col-end-9 row-start-3 row-end-6 grid grid-cols-6 grid-rows-6 bg/50 z-[1]'>
                    <img src={cardRight} alt="" className='col-start-3 col-end-6 row-start-3 row-end-6' />
                    <h2 className='z-10 col-start-3 col-end-6 row-start-3 row-end-6 -translate-y-4 flex justify-center items-center text-center'>
                        Tudu or not Tudu
                        <br />
                        It's up to you
                    </h2>
                    <img src={pen} alt="" className='z-10 col-start-5 col-end-6 row-start-2 row-end-4 -translate-x-8 translate-y-8' />
                </div>
                <motion.div
                    style={{
                        translateX: translateX,
                        translateY: translateY
                    }}
                    transition={{ 
                        type: 'spring',
                        damping: 10,
                        mass: 0.75,
                        stiffness: 100,
                    }} 
                    className="flex justify-center items-center col-start-2 col-end-4 row-start-2 row-end-4 z-[2]">
                    <img src={blueBubble} alt="" />
                </motion.div>
                <motion.div
                    whileHover={{ rotate: -180 }}
                    transition={{ 
                        type: 'spring',
                        damping: 10,
                        mass: 0.75,
                        stiffness: 100,
                    }} 
                    style={{
                        translateX: translateX,
                        translateY: translateY
                    }}
                    className="flex justify-center items-center col-start-6 col-end-8 row-start-2 row-end-4 z-[2]">
                    <img src={blueBubble} alt="" />
                </motion.div>
                <motion.div 
                    style={{
                        translateX: translateX,
                        translateY: translateY,
                        scale: 1/2
                    }}
                    transition={{ 
                        type: 'spring',
                        damping: 10,
                        mass: 0.75,
                        stiffness: 100,
                    }} 
                className="flex justify-center items-center col-start-1 col-end-3 row-start-4 row-end-6 z-[2]">
                    <img src={blueBubble} alt="" />
                </motion.div>
                <motion.div 
                style={{
                    translateX: translateX2,
                    translateY: translateY2,
                    scale: 1/2
                }}
                transition={{ 
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                }} 
                className="flex justify-center items-center col-start-3 col-end-5 row-start-1 row-end-3 z-[2]">
                    <img src={redBubble} alt="" />
                </motion.div>
                <motion.div 
                style={{
                    translateX: translateX2,
                    translateY: translateY2,
                    scale: 1/2
                }}
                transition={{ 
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                }} 
                className="flex justify-center items-center col-start-7 col-end-9 row-start-1 row-end-3 z-[2]">
                    <img src={redBubble} alt="" />
                </motion.div>
                <motion.div 
                style={{
                    translateX: translateX2,
                    translateY: translateY2,
                    scale: 2/3
                }}
                transition={{ 
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                }} 
                className="flex justify-center items-center col-start-5 col-end-7 row-start-4 row-end-6 z-[2]">
                    <img src={redBubble} alt="" />
                </motion.div>
                <div 
                className="flex justify-center items-center col-start-5 col-end-7 row-start-1 row-end-3"
                >
                    <img src={note} alt="" className="xxl:translate-y-4 xxl:-translate-x-4 z-[2]" />
                </div>
                <div 
                className="flex justify-center items-center col-start-3 col-end-5 row-start-4 row-end-6">
                    <img src={calendar} alt="" className="xxl:-translate-y-4 xxl:translate-x-4 z-[2]" />
                </div>
                <div 
                    className="items-center justify-center col-start-3 col-end-7 row-start-2 row-end-5 grid grid-cols-8 grid-rows-6 z-[1]">

                    <motion.div 
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY
                }}
                transition={{ 
                    type: 'spring',
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                }} 
                    className="max-h-full rounded-full aspect-square shadow-2xl col-start-2 col-end-9 row-start-1 row-end-7 flex justify-center items-end overflow-hidden bg-gradient-to-bl from-[hsla(177,47%,50%,.3)] via-[hsla(194,38%,18%,.3)] to-[hsla(355,78%,58%,.3)] -z-50 ">
                        <img src={perso} alt="" className="h-[75%] translate-y-2 aspect-square" />
                    </motion.div>
                    <motion.img 
                        src={logo} 
                        alt="logo" 
                        className="max-h-32 col-start-2 col-end-4 row-start-3 row-end-4 translate-x-[50%] z-[2]"
                        transition={
                            {y: {
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        }
                        animate={{
                        y: ["30%", "-30%"],
                        // translateY: ['0%', '50%', '30%', '15%', '30%', '50%']
                        }} />
                </div>
            </motion.div>
        </div>
    );
};

const HomePageMobile = () => {
    return (
        <div className="w-screen h-screen max-w-full max-h-full grid grid-rows-6 grid-cols-8 md:hidden overflow-hidden">

            <div className="row-start-1 row-end-5 col-start-1 col-end-9 rounded-b-full -translate-y-8 bg-gradient-to-bl from-[hsla(177,47%,50%,.3)] via-[hsla(194,38%,18%,.3)] to-[hsla(355,78%,58%,.3)]"></div>

            <div className="row-start-2 row-end-4 col-start-2 col-end-8 flex justify-center items-center font-extrabold text-[100px] text-transparent bg-clip-text bg-gradient-to-l from-[hsl(201,89%,21%)] via-[hsl(194,38%,18%)] to-[hsl(355,78%,58%)]">
                <h1>TUDU</h1>
            </div>

            <div className="row-start-4 row-end-7 col-start-1 col-end-9 flex justify-end items-end">
                <img src={perso} alt="" className="translate-x-[20%] translate-y-[20%]" />
            </div>

            <img src={logo} alt="" className="row-start-5 row-end-6 col-start-2 col-end-4 translate-y-[50%]" />

        </div>
    )
}

const HomePage = () => {
    return (
        <>
            <HomePageDesktop />
            <HomePageMobile />
        </>
    )
}

export default HomePage;
