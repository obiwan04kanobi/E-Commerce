import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Config";
// import {
//   loadUserRequestApi,
//   logoutRequestApi,
//   updateProfileRequestApi,
//   updatePasswordRequestApi,
//   getAllUsersApi,
//   UpdateUserAdminApi,
//   deleteUserAdminApi,
//   getSingleUserAdminApi,
// } from "./UserApi";

const initialState = {
    wishlist:[],
    product:[],
};


export const AddToWishList = createAsyncThunk(
    "product/AddToWishlist",
    async (value) => {
        await updateDoc(doc(db, "Users",value.userId ),{wishList : [value]});
        return value;
    }
);

export const FetchAllProduct = createAsyncThunk(
    "user/FetchAllProduct",
    async (value) => {
        const response = await getDocs(collection(db, "Products")); 
        console.log(response);
        return response;
    }
);

// export const SignUpRequest = createAsyncThunk(
//     "user/SignUpRequest",
//     async (value) => {
//         const response = await SignUpRequestApi(value);
//         return response.data;
//     }
// );

// export const loadUserRequest = createAsyncThunk(
//   "user/loadUserRequest",
//   async () => {
//     const response = await loadUserRequestApi();
//     return response.data;
//   }
// );

// export const logoutRequest = createAsyncThunk(
//   "user/logoutRequest",
//   async () => {
//     await logoutRequestApi();
//     // console.log(response);
//   }
// );

// export const updateProfileRequest = createAsyncThunk(
//   "user/updateProfile",
//   async (value) => {
//     await updateProfileRequestApi(value);
//     // console.log(response);
//   }
// );

// export const updatePasswordRequest = createAsyncThunk(
//   "user/updatePassword",
//   async (value) => {
//     await updatePasswordRequestApi(value);
//     // console.log(response);
//   }
// );

// export const forgotPasswordRequest = createAsyncThunk(
//   "user/forgotPassword",
//   async (value) => {
//     await forgotPasswordRequestApi(value);
//     // console.log(response);
//   }
// );

// export const resetPasswordRequest = createAsyncThunk(
//   "user/resetPassword",
//   async (value) => {
//     await resetPasswordRequestApi(value);
//     // console.log(response);
//   }
// );

// export const getAllUsers = createAsyncThunk(
//   "user/getAllUsers",
//   async () => {
//     const response = await getAllUsersApi();
//     // console.log(response);
//     return response.data;
//   }
// );
// export const getSingleUserAdmin = createAsyncThunk(
//   "user/getSingleUserAdmin",
//   async (id) => {
//     const response = await getSingleUserAdminApi(id);
//     // console.log(response);
//     return response.data;
//   }
// );

// export const UpdateUserAdmin = createAsyncThunk(
//   "user/UpdateUserAdmin",
//   async ({id,values}) => {
//     const response = await UpdateUserAdminApi({id,values});
//     // console.log(response);
//     return response.data;
//   }
// );

// export const deleteUserAdmin = createAsyncThunk(
//   "user/deleteUserAdmin",
//   async (id) => {
//     const response = await deleteUserAdminApi(id);
//     // console.log(response);
//     return response.data;
//   }
// );



export const productSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProduct(state, action) {
            const { product } = action.payload;
            state.product = product;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(AddToWishList.pending, (state) => {
        })
        .addCase(AddToWishList.fulfilled, (state, action) => {
        })
        .addCase(AddToWishList.rejected, (state, action) => {
        })
        .addCase(FetchAllProduct.pending, (state) => {
        })
        .addCase(FetchAllProduct.fulfilled, (state, action) => {
            const querySnapshot = action.payload;
            const product = querySnapshot.docs.map(doc => doc.data());
            state.product = product;
        })
        .addCase(FetchAllProduct.rejected, (state, action) => {
        })
        // .addCase(SignUpRequest.pending, (state) => {
        //     state.status = "loading";
        // })
        // .addCase(SignUpRequest.fulfilled, (state, action) => {
        //     const { token, user } = action.payload;
        //     state.status = "authenticated";
        //     state.token = token;
        //     state.message = "Login successful";
        //     // state.token = token;
        //     state.user = user;
        // })
        // .addCase(SignUpRequest.rejected, (state, action) => {
        //     state.status = "error";
        //     state.error = action.error.message;
        // })
        // .addCase(loadUserRequest.pending, (state) => {
        //     state.status = "loading";
        // })
        //   .addCase(loadUserRequest.fulfilled, (state, action) => {
        //     const { user } = action.payload;
        //     state.status = "authenticated";
        //     state.message = "Login successful";
        //     state.user = user;
        //   })
        //   .addCase(loadUserRequest.rejected, (state, action) => {
        //     state.status = "notAuthenticated";
        //   })
        //   .addCase(logoutRequest.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(logoutRequest.fulfilled, (state, action) => {
        //     state.status = "notAuthenticated";
        //     state.message = "Logout successful";
        //     state.user = null;
        //   })
        //   .addCase(logoutRequest.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(updateProfileRequest.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(updateProfileRequest.fulfilled, (state, action) => {
        //     state.status = "authenticated";
        //   })
        //   .addCase(updateProfileRequest.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(updatePasswordRequest.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(updatePasswordRequest.fulfilled, (state, action) => {
        //     state.status = "authenticated";
        //   })
        //   .addCase(updatePasswordRequest.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(forgotPasswordRequest.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        //     state.status = "notAuthenticated";
        //     state.mailsent = true;
        //   })
        //   .addCase(forgotPasswordRequest.rejected, (state, action) => {
        //     state.status = "error";
        //     state.mailsent = false;
        //   })
        //   .addCase(resetPasswordRequest.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        //     state.status = "notAuthenticated";
        //   })
        //   .addCase(resetPasswordRequest.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(getAllUsers.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(getAllUsers.fulfilled, (state, action) => {
        //     state.status = "authenticated";
        //     state.users = action.payload;
        //   })
        //   .addCase(getAllUsers.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(getSingleUserAdmin.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(getSingleUserAdmin.fulfilled, (state, action) => {
        //     state.status = "authenticated";
        //     state.adminUser = action.payload;
        //   })
        //   .addCase(getSingleUserAdmin.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(UpdateUserAdmin.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(UpdateUserAdmin.fulfilled, (state, action) => {
        //     state.status = "authenticated";
        //   })
        //   .addCase(UpdateUserAdmin.rejected, (state, action) => {
        //     state.status = "error";
        //   })
        //   .addCase(deleteUserAdmin.pending, (state) => {
        //     state.status = "loading";
        //   })
        //   .addCase(deleteUserAdmin.fulfilled, (state, action) => {
        //     state.status = "authenticated";
        //   })
        //   .addCase(deleteUserAdmin.rejected, (state, action) => {
        //     state.status = "error";
        //   });
    },
});

export const { setProduct
} = productSlice.actions;

export default productSlice.reducer;