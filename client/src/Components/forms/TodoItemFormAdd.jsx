import React from "react";
import { useForm, Controller } from "react-hook-form";
import { handleAdd } from "../../events/axiosGlobal";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// select
import Creatable from "react-select/creatable";
import customStyle from "./selectStyle"

export default function TodoItemFormAdd({ options }) {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      entrydate: new Date().toISOString().slice(0, 10),
    },
  });

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(Cookies.get("id"));
  }, []);


  const onSubmit = async (data = {}) => {
    setShowModal(false);
    data.user_id = userId;
    data.category = data.category.value
    // console.log(data, "data");
    await handleAdd(data);
    window.location.reload();
  };
  return (
    <div className="container mx-auto">
      <button
        className="justify-center items-center flex bg-cyan-900 text-white active:bg-pink-600 font-logoFont uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none  mr-1 mb-1  transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {" "}
        Add{" "}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
           onClick={() => {setShowModal(false)}}>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*Content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              onClick={(e) => {e.stopPropagation()}}>
                {/*Edit Section Header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-logoFont"> Add </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
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
                        htmlFor="name"
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
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-logoFont text-gray-900 "
                      >
                        Add your Tu Du
                      </label>
                      <input
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
                        Add your Description if you want
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream"
                        {...register("description", { required: true })}
                        placeholder="Description "
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
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-cyan-900 text-white active:bg-white font-logoFont uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
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