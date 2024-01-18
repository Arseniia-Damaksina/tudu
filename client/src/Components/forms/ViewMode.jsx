import React from "react";
import { useState } from "react";
import { viewModalFn } from "../main/viewModelFn";

function ViewMode() {
    const [showModal,setShowModal] = useState(false)
    const changeModel = () => {
        setShowModal(!showModal);
        console.log("changeModel", showModal);
        viewModalFn(showModal)
    };
    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
                onClick={changeModel}
                type="button"
                className="justify-center items-center flex bg-cyan-900 text-white active:bg-pink-600 font-logoFont uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none  mr-1 mb-1  transition-all duration-150"
            >
                View
            </button>
        </div>
    );
}

export default ViewMode;
