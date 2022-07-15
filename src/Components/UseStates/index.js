import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  // ----------------------------------- Estados

  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  // ----------------------------- Declaraciones

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: !state.loading,
      error: false,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  // ------------------------------------------ Efectos

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
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <h2>Eliminar {name} </h2>
        <p>¿Esta seguro de que desea eliminar useState?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Sí, eliminar.
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, volver.
        </button>
      </>
    );
  } else {
    return (
      <>
        <h2> Use State elimidado con exito.</h2>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Recurperar Use State
        </button>
      </>
    );
  }
}

export { UseState };
