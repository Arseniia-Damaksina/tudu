// React and react libraries
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
// eslint-disable-next-line
import Creatable from "react-select/creatable";
import customStyle from "./selectStyle";
// Cookies
import { handleEdit } from "../../events/axiosGlobal";
import Cookies from "js-cookie";
// Icons and components
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function TodoItemForm({ tudu, todo }) {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      id: todo.id,
      category: todo.category,
      ptaskname: todo.ptaskname,
      description: todo.description,
      duedate: new Date(todo.duedate).toISOString().slice(0, 10),
      entrydate: new Date(todo.entrydate).toISOString().slice(0, 10),
    },
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(Cookies.get("id"));
  }, []);

  const onSubmit = async (data = {}) => {
    setShowModal(false);
    data.user_id = userId;
    data.category = data.category.value;
    // console.log(data, "data");
    await handleEdit(data);
    window.location.reload();
  };

  const handleChange = (event) => {
    const { newInfo, value } = event.target;
    setValue(newInfo, value);
  };

  // --- Category ---
  const newArray = tudu.map((obj) => {
    return { category: obj.category };
  });
  // console.log(newArray)
  const categoryArray = [...new Set(newArray.map((item) => item.category))];
  // console.log(categoryArray)
  const options = categoryArray.map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  useEffect(() => {
    setUserId(Cookies.get("id"));
  }, []);
  return (
    <div className="container mx-auto">
      <div className="w-full sm:w-auto rounded-lg bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white">
        <EllipsisVerticalIcon
          onClick={() => setShowModal(true)}
          className="h-6 w-6  mx-2 my-2.5 inline-flex justify-center"
        />
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*Content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/*Edit Section Header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-logoFont"> Edit </h3>
                </div>
                {/*Body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    action="#"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-logoFont text-gray-900 "
                      >
                        Choose your Category
                      </label>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => {
                          // sending integer instead of string.
                          return (
                            <Creatable
                              styles={customStyle}
                              options={options}
                              value={field.value}
                              onChange={(selectedOption) => {
                                setValue("category", {
                                  value: selectedOption?.value,
                                  label: selectedOption?.label,
                                });
                                field.onChange(selectedOption);
                              }}
                            />
                          );
                        }}
                      />
                      {errors.category && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-logoFont text-gray-900 "
                      >
                        Task Name
                      </label>
                      <input
                        onChange={handleChange}
                        type="name"
                        id="ptaskname"
                        className="shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream"
                        {...register("ptaskname", { required: true })}
                        placeholder="Tu Du "
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-logoFont text-gray-900 "
                      >
                        Description
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        id="description"
                        className="shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream"
                        {...register("description", { required: true })}
                        placeholder="description "
                      />
                    </div>
                    <div className="flex">
                      <label htmlFor="entrydate">
                        <label
                          htmlFor="name"
                          className="shadow-sm text-gray-900 text-sm rounded-lg font-logoFont block w-full p-2.5 bg-lightcream"
                        >
                          Entry Date
                        </label>
                        <input
                          onChange={handleChange}
                          type="date"
                          name="entrydate"
                          className="shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream"
                          {...register("entrydate", { required: true })}
                        />
                      </label>
                      <label htmlFor="duedate">
                        <label
                          htmlFor="name"
                          className="shadow-sm text-gray-900 text-sm rounded-lg font-logoFont block w-full p-2.5 bg-lightcream"
                        >
                          Due Date
                        </label>
                        <input
                          onChange={handleChange}
                          type="date"
                          name="duedate"
                          className="shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream "
                          // style={{ WebkitAppearance: "none", color: "white", filter: "invert(1)" }}
                          {...register("duedate", { required: true })}
                        />
                      </label>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-logoFont uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-cyan-900 text-white active:bg-white font-logoFont uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="Submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
