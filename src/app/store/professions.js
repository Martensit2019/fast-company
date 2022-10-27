import professionService from "../services/profession.service";

const { createSlice } = require("@reduxjs/toolkit");

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

export const loadProfessionsList = () => async (dispatch) => {
  dispatch(professionsRequested());
  try {
    const { content } = await professionService.get();
    dispatch(professionsRecived(content));
  } catch (error) {
    dispatch(rofessionsRequestFiled(error.massage));
  }
};
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;

export default professionsReducer;
