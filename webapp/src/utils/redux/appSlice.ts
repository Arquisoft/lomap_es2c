import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    lastPath: string,
}

const initialState: AppState = {
    lastPath: null,
};


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLastPath(state, action: PayloadAction<string>) {
      state.lastPath = action.payload;
    },
    }
})

export default appSlice.reducer;