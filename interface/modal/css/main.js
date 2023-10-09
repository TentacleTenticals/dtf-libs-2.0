const modalCss = () => {
  return `
  body:has(.modal) {
    overflow: hidden;
  }

  .modal {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    padding: 0;
    width: max-content;
    height: max-content;
    background-color: rgb(255,255,255);
    box-shadow: 0 0 3px 1px rgb(0 0 0);
    z-index: 1000;
  }
  .modal::backdrop {
    background-color: rgb(0 0 0 / 80%);
  }
  .modal>.header {
    text-align: center;
    background-color: rgb(40,40,40);
    color: rgb(255,255,255);
    border-radius: 2px;
    margin: 3px;
    padding: 0 3px 2px 3px;
    cursor: pointer;
  }

  .modal .rz {
    font-size: 11px;
    font-weight: 600;
    text-align: center;
  }

  .modal>form {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    padding: 5px;
    min-width: 200px;
    min-height: 200px;
  }

  .modal>button {
    margin: 3px;
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    border: unset;
    border-radius: 2px;
    box-shadow: 0 0 2px 0px rgb(0 0 0);
    cursor: pointer;
  }
  `;
}
