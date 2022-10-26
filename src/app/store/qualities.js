import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFeetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFeetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;

const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFeetch } = getState().qualities;
  if (isOutdated(lastFeetch)) {
    console.log("getState", lastFeetch);
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.fetchAll();
      dispatch(qualitiesReceved(content));
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;
export const getQualitiesByIds = (getQualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArr = [];
    for (const qualId of getQualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (quality._id === qualId) {
          qualitiesArr.push(quality);
          break;
        }
      }
    }
    return qualitiesArr;
  }
  return [];
};

export default qualitiesReducer;
