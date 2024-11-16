import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

const createStore = (rememberMe) => {
  const persistedReducer = persistReducer(
    {
      key: "root",
      storage: rememberMe ? storage : sessionStorage,
      whitelist: ["user"],
    },
    counterReducer
  );

  const store = configureStore({
    reducer: {
      counter: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export default createStore;

// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from "./counterSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/lib/storage/session";

// // Main function to create a store with persistence settings
// export default function createStore(rememberMe) {
//   const persistConfig = {
//     key: "root",
//     storage: rememberMe ? storage : sessionStorage,
//     whitelist: ["user"], // Persist only user data
//   };

//   const persistedReducer = persistReducer(persistConfig, counterReducer);

//   const store = configureStore({
//     reducer: {
//       counter: persistedReducer,
//     },
//     middleware: getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }),
//   });

//   const persistor = persistStore(store);

//   return { store, persistor };
// }
