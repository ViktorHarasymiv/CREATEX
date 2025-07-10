import { createSlice } from "@reduxjs/toolkit";

// PROFILE STORAGE

const profileLocaleStore = () => {
  const savedProfileData = localStorage.getItem("profileArray");
  return savedProfileData ? JSON.parse(savedProfileData) : []; // Десеріалізація JSON у масив
};

const isLoggedUser = () => {
  const savedLoggedUser = localStorage.getItem("isLogged");
  return savedLoggedUser ? JSON.parse(savedLoggedUser) : false; // Десеріалізація JSON у масив
};

const initialState = {
  loggedUser: {
    info: {
      persone: {
        fullname: "",
        password: "",
        role: "",
      },
      contacts: {
        email: "",
      },
    },
    logged: false,
    loggedTime: null,
    political: false,
  },
};

// CURRENT ARRAY FOT USER

const currentUser = () => {
  const savedCurrentUser = localStorage.getItem("currentUser");
  return savedCurrentUser ? JSON.parse(savedCurrentUser) : { initialState }; // Десеріалізація JSON у масив
};
const accountSlice = createSlice({
  name: "account",
  initialState: {
    profile: profileLocaleStore(),
    isLogged: isLoggedUser(),
    loggedUser: currentUser(),
  },
  reducers: {
    getProfile: (state, action) => {
      return {
        ...state,
        profile: [...state.profile, action.payload],
      };
    },
    deleteProfile: (state, action) => {
      return {
        ...state,
        profile: state.profile.filter((user) => user.email !== action.payload),
      };
    },
    getLogged: (state, action) => {
      return {
        ...state,
        isLogged: action.payload,
      };
    },
    setUserInfo: (state, action) => {
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          info: {
            ...state.loggedUser.info,
            persone: {
              ...action.payload.persone,
            },
            contacts: {
              ...action.payload.contacts,
            },

            // address: {
            //   ...state.loggedUser.info.address,
            //   ...action.payload.address,
            // },
          },
          logged: action.payload.logged,
          loggedTime: action.payload.loggedTime,
          political: action.payload.political,
        },
      };
    },
  },
});

export const { getProfile, deleteProfile, getLogged, setUserInfo } =
  accountSlice.actions;

export default accountSlice.reducer;
