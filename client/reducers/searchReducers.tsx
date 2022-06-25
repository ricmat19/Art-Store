// import IndexAPI from "../apis/indexAPI";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// interface SearchState {}

// const initialState: SearchState = {};

// // Get and return search data
// export const getSearchDataReducer = createAsyncThunk("search", async () => {
//   try {
//     //Query all data for search
//     const allCommunity = await IndexAPI.get(`/community`);
//     const allCourses = await IndexAPI.get(`/courses`);
//     const allHelp = await IndexAPI.get(`/help`);
//     const allBlog = await IndexAPI.get(`/media/blog`);
//     // const allChannel = await IndexAPI.get(`/media/channel`);
//     // const allPodcast = await IndexAPI.get(`/media/podcast`);
//     const allProducts = await IndexAPI.get(`/products`);

//     //Add all queried data to an array
//     const collectionOfQueries = [
//       allCommunity.data.data.community,
//       allCourses.data.data.courses,
//       allHelp.data.data.helpArticles,
//       allBlog.data.data.posts,
//       allProducts.data.data.products,
//     ];

//     //Create an array with all searchable data and set state
//     const collectionOfAllData: string[] = [];
//     for (let i = 0; i < collectionOfQueries.length; i++) {
//       for (let j = 0; j < collectionOfQueries[i].length; j++) {
//         collectionOfAllData.push(collectionOfQueries[i][j]);
//       }
//     }
//     return collectionOfAllData;
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Search reducers
// const searchReducers = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     extraReducers(builder: any) {
//       builder.addCase(
//         // Extra reducer to get search data
//         getSearchDataReducer.fulfilled,
//         (
//           state: { status: string; data: any[] },
//           action: PayloadAction<any[], string, { currentPage: number }>
//         ) => {
//           state.status = "fulfilled";
//           state.data = action.payload;
//         }
//       );
//     },
//   },
// });

// export default searchReducers.reducer;
// export const selectSearch = (state: RootState) => state.search;
