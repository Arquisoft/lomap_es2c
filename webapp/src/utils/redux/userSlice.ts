import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    imgUrl: string,
}

const initialState: UserState = {
    imgUrl: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProfileImage(state, action: PayloadAction<string>) {
      state.imgUrl = action.payload;
    },
    }
})

export default userSlice.reducer;