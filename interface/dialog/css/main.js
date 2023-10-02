const dialogCss = () => {
  return `
  .dialog {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    position: absolute;
    width: max-content;
    height: max-content;
    background-color: rgb(255,255,255);
    box-shadow: 0 0 3px 1px rgb(0 0 0);
    z-index: 1000;
  }
  .dialog::backdrop {
    background-color: rgb(0 0 0 / 80%);
  }
  .dialog>.header {
    text-align: center;
    background-color: rgb(40,40,40);
    color: rgb(255,255,255);
    border-radius: 2px;
    margin: 3px;
    padding: 0 3px 2px 3px;
    cursor: pointer;
  }

  .dialog .rz {
    font-size: 11px;
    font-weight: 600;
    text-align: center;
  }

  .dialog>form {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    padding: 5px;
  }
  `;
}
