import axios from "axios";
import Cookies from "js-cookie";

// Default setup
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
const axiosGlobal = axios.create({
  baseURL: ' http://localhost:4000',
  headers: {
    Accept: "application/json",
    //     Authorization: AUTH_TOKEN,
  },
});
// axios.defaults.baseURL = "https://tutu-tudu.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//registration handler => POST

const handleRegistration = async (data) => {
  try {
    const response = await axios.post("/register", data);
    await response.data;
    console.log(response.data)
  } catch (error) {
    console.log(error, "registration post error");
  }
};

//login handler => GET and AUTH

const HandleLogin = async (data) => {
  try {
    // console.log(data, "axios global login");
    const response = await axios.post("/user/login", data);

    const resData = await response.data;
    // console.log(resData, "login post request");

    // Cookies.set("email", resData.email, { path: "/" });
    Cookies.set("id", resData.id, { path: "/" });
    // Cookies.set("view", true, { path: "/dashboard" });
    document.cookie = `token=${resData.token}`;
    // document.cookie = `token=${resData.token}`;
    // document.cookie = `email=${resData.email}`
  } catch (err) {
    console.log(err, "connectionError");
  }
};

//connection add tudu => POST
const handleAdd = async (data) => {
  // Cookies.get("email");
  // console.log(email, "cookie");
  // console.log(data, "axiosGlobal");

  try {
    await axios.post(`personal/addTudu`, data);
    // response.data.headers['Content-Type'];
    // console.log(response, "AddTuduResponse");
  } catch (err) {
    console.log(err, "AddTuduError");
  }
};

//connection edit tudu => PATCH
const handleEdit = async (data) => {
  try {
    await axios.patch(`/user/editTudu/${data.id}`,data);
    // console.log(response, "EditResponse");
  } catch (err) {
    console.log(err, "EditError");
  }
};

let allTudu = [];
//get todos  => GET
const GetTodos = async (data) => {
  try {
    const id = Cookies.get("id");
    // console.log(id);
    const response = await axios.get(`/user/getTudu/${data}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    // await console.log(response.data, "connectionResponse");
    allTudu = response.data;
    return response.data;
  } catch (err) {
    console.log(err, "connectionError");
  }
};

//filtering Active
const filteringTuduActive = async (data) => {
  try {
    const dataF = Cookies.get("id");
    const response = await axios.get(`/user/${dataF}/${data}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    // await console.log(response.data, "filteringResponseActive");
    allTudu = response.data;
    // console.log(allTudu, "filteing data");
    return response.data;
  } catch (err) {
    console.log(err, "connectionError");
  }
};

//filtering Category
const filteringTuduCategory = async (category) => {
  try {
    const dataF = Cookies.get("id");
    const response = await axios.get(`/user/getTudu/${dataF}/${category}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    // await console.log(response.data, "filteringCategoryResponseActive");
    allTudu = response.data;
    // console.log(allTudu, "filteing category data");
    return response.data;
  } catch (err) {
    console.log(err, "connectionError");
  }
};

// update tudu isdone
const isDoneTudu = async (id) => {
  try {
    const response = await axios.patch(`/user/updateTudu/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    // await console.log(response.data, "connectionResponse");
    allTudu = response.data;
    return response.data;
  } catch (err) {
    console.log(err, "connectionError");
  }
};

// delete todo
const deleteTudu = async (id) => {
  try {
      const response = await axios.delete(`/user/deleteTudu/${id}`, {
          headers: {
              "ngrok-skip-browser-warning": "69420",
          },
      });
      console.log(response.data, "DeleteResponse");
  } catch (err) {
    console.log(err, "DeleteError");
  }
};

//
const cookieSetFn = async (cookie) => {
  try {
    Cookies.set("view", cookie, { path: "/dashboard" });
  } catch (err) {
    console.log(err, "Console Cookie Error");
  }
};
export default axiosGlobal;
export {
  handleRegistration,
  HandleLogin,
  handleAdd,
  GetTodos,
  filteringTuduActive,
  filteringTuduCategory,
  handleEdit,
  isDoneTudu,
  deleteTudu,
  cookieSetFn,
};
