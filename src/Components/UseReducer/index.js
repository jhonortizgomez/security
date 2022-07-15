import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionType.confirm });
  const onError = () => dispatch({ type: actionType.error });
  const onCheck = () => dispatch({ type: actionType.check });
  const onDelete = () => dispatch({ type: actionType.delete });
  const onReset = () => dispatch({ type: actionType.reset });

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionType.write, payload: value });
  };

  // ------------------------------------------ Efecto

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 2000);
    }
  }, [state.loading]);

  // ----------------------------------- Render

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name} </h2>
        <p>Por favor escribe el codigo de seguridad.</p>
        {state.error && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onCheck}> Comprobar </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <h2>Eliminar {name} </h2>
        <p>¿Esta seguro de que desea eliminar useState?</p>
        <button onClick={onDelete}> Sí, eliminar. </button>
        <button onClick={onReset}> No, volver. </button>
      </>
    );
  } else {
    return (
      <>
        <h2> Use State elimidado con exito.</h2>
        <button onClick={onReset}> Recurperar Use State </button>
      </>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionType = {
  confirm: "CONFIRM",
  error: "ERROR",
  write: "WRITE",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
};
// ----------------- Reducer Object
const reducerObject = (state, payload) => ({
  [actionType.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionType.write]: {
    ...state,
    value: payload,
  },
  [actionType.check]: {
    ...state,
    loading: true,
    error: false,
  },
  [actionType.confirm]: {
    ...state,
    loading: false,
    confirmed: true,
  },
  [actionType.delete]: {
    ...state,
    deleted: true,
  },
  [actionType.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };

// // ----------------- Reducer if

// const reducerIf = (state, action) => {
//     if( action.type === 'ERROR'){
//         return{
//             ...state,
//             error: true,
//             loading: false,
//         };
//     } else if (action.type === 'CHECK') {
//         return {
//             ...state,
//             loading: true
//         }
//     } else{
//         return{
//             ...state,
//         };
//     }
// };

// // ----------------- Reducer Switch

// const reducerSwitch = (state, action) => {
//     switch(action.type) {
//         case 'ERROR':
//             return  {
//                 ...state,
//                 error: true,
//                 loading: false,
//             };
//             case 'CHECK':
//                 return  {
//                 ...state,
//                 loading: true
//             };
//             default:
//             return  {
//                 ...state,
//             };
//         }
//     };
