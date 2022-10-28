import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
// import isOutdated from "../utils/isOutdated";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsRecived: (state, action) => {
      state.entities = action.payload;
      // state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;

const { professionsRequested, professionsRecived, rofessionsRequestFiled } =
  actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  // const { lastFetch } = getState().professions;
  // if (isOutdated(lastFetch)) {
  dispatch(professionsRequested());
  try {
    const { content } = await professionService.get();
    dispatch(professionsRecived(content));
  } catch (error) {
    dispatch(rofessionsRequestFiled(error.massage));
  }
  // }
};
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === id);
  }
};
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;

export default professionsReducer;
