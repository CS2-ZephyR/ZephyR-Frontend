import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  knife: '',
  glove: 0,
  agent: {
    t: '',
    ct: '',
  },
  music: 0,
  detail: [],
  smoke: {
    R: 255, G: 255, B: 255
  }
};

const skinSlice = createSlice({
  name: 'skin',
  initialState,
  reducers: {
    setSkinData: (state, action) => {
      const { knife, glove, agent, music, detail, smoke } = action.payload;

      state.knife = knife;
      state.glove = glove;
      state.agent = agent;
      state.music = music;
      state.detail = detail;
      state.smoke = smoke;
    },

    updateSkinPaint: (state, action) => {
      const { weapon, paint } = action.payload;

      if (state.detail[weapon] === undefined) {
        state.detail[weapon] = {
          paint: 0,
          wear: 0,
          seed: 0,
          name: '',
        };
      }

      state.detail[weapon].paint = paint;
    },

    updateSkinWear: (state, action) => {
      const { weapon, wear } = action.payload;

      if (state.detail[weapon] === undefined) {
        state.detail[weapon] = {
          paint: 0,
          wear: 0,
          seed: 0,
          name: '',
        };
      }

      state.detail[weapon].wear = wear;
    },

    updateSkinSeed: (state, action) => {
      const { weapon, seed } = action.payload;

      if (state.detail[weapon] === undefined) {
        state.detail[weapon] = {
          paint: 0,
          wear: 0,
          seed: 0,
          name: '',
        };
      }

      state.detail[weapon].seed = seed;
    },

    updateSkinName: (state, action) => {
      const { weapon, name } = action.payload;

      if (state.detail[weapon] === undefined) {
        state.detail[weapon] = {
          paint: 0,
          wear: 0,
          seed: 0,
          name: '',
        };
      }

      state.detail[weapon].name = name;
    },

    updateModel: (state, action) => {
      const { team, model } = action.payload;

      state.agent[team] = model;
    },

    updateMusic: (state, action) => {
      const { music } = action.payload;

      state.music = music;
    },

    updateGlove: (state, action) => {
      const { glove } = action.payload;

      state.glove = glove;
    },

    updateKnife: (state, action) => {
      const { knife } = action.payload;

      state.knife = knife;
    },

    updateSmoke: (state, action) => {
      const { r, g, b } = action.payload;

      state.smoke.R = r;
      state.smoke.G = g;
      state.smoke.B = b;
    },
  },
});

export const {
  setSkinData,
  updateSkinPaint,
  updateSkinWear,
  updateSkinSeed,
  updateSkinName,
  updateModel,
  updateMusic,
  updateGlove,
  updateKnife,
  updateSmoke
} = skinSlice.actions;

export default skinSlice.reducer;
