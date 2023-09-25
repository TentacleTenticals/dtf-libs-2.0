export const settingsMenuCss = `
.dtf-scriptWindow {
  position: fixed;
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  top: 0px;
  left: 0px;
  z-index: 1000;
  padding: 3px;
  max-width: 60%;
  max-height: 100%;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(18, 101, 134) rgb(0, 0, 0);
}
.dtf-scriptWindow .header {
  display: block;
  position: relative;
  background-color: rgb(40 40 40);
  color: rgb(231 193 255);
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  font-family: 'Chakra Petch', sans-serif;
  letter-spacing: 0.5px;
  border-radius: 2px;
  box-shadow: 0 0 2px 0px rgb(255 255 255);
  cursor: pointer;
}

.dtf-scriptWindow fieldset {
  display: flex;
  background-color: rgb(35 35 35);
  flex-direction: column;
  flex-wrap: wrap;
  padding: 3px;
  margin: 5px 0px 5px 0px;
  border: 1px solid rgb(80 80 80);
  gap: 5px 10px;
}
.dtf-scriptWindow fieldset.hide .list {
  display: none;
}
.dtf-scriptWindow fieldset .list {
  display: flex;
  flex-direction: column;
  padding: 5px;
  background-color: rgb(18 18 18);
  border-radius: 2px;
  gap: 5px 15px;
  box-shadow: 0 0 2px 1px rgb(72 72 72);
}
.dtf-scriptWindow fieldset.grid .list {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, max-content);
}

.dtf-scriptWindow input {
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  border: unset;
  border: 1px solid rgb(102 102 102);
  /* box-shadow: 0 0 1px 1px rgb(133 133 133); */
  border-radius: 0px;
  outline: none;
}

.dtf-scriptWindow::-webkit-scrollbar {
  width: 9px;
  background: unset;
}
.dtf-scriptWindow::-webkit-scrollbar-track {
  background: rgb(0 0 0 / 67%);
}
.dtf-scriptWindow::-webkit-scrollbar-track-piece {
  background-color: unset;
  border: 3px solid rgba(155, 105, 105, 0);
  border-radius: 0px;
  width: 1px;
  height: 1px;
}
.dtf-scriptWindow::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 18px;
  box-shadow: inset 0px 0px 0px 1px rgb(41 206 145 / 12%),
    inset 0px 0px 5px 1px rgb(255 255 255 / 70%),
    inset 0px 0px 0px 1px rgb(41 206 145 / 12%);
}
.dtf-scriptWindow::-webkit-scrollbar-corner {
  background-color: unset;
}

.dtf-scriptWindow .header .title {
  text-align: center;
  font-weight: 500;
  padding: 5px 0px 0px;
}
.DTF-scriptSettingsOpener .container {
  display: flex;
  flex-direction: row;
  gap: 3px 5px;
}

.dtf-scriptWindow .header button {
  display: inline-block;
  font-size: 12px;
  position: absolute;
  top: 0px;
  right: 4px;
  padding: 0px 5px 1px 5px;
}
.dtf-scriptWindow legend {
  font-weight: 500;
  font-size: 15px;
}
.dtf-scriptWindow button {
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  font-size: 14px;
  padding: 0px 3px 0px 3px;
  box-shadow: black 0px 0px 2px 0px;
  cursor: pointer;
  border: 1px solid rgb(255 255 255);
}
.dtf-scriptWindow button:hover {
  background-color: rgb(62 27 78);
  text-shadow: 0px 0px 2px rgb(0 0 0);
}
.dtf-scriptWindow input {
  width: max-content;
}
.dtf-scriptWindow .input-label {
  font-size: 13px;
  position: relative;
  top: -2px;
}

.dtf-scriptWindow .text {
  font-size: 13px;
  font-weight: 500;
  white-space: pre-wrap;
  line-height: 15px;
}

.dtf-scriptWindow
  ul::-webkit-scrollbar {
  width: 9px;
  background: unset;
}
.dtf-scriptWindow
  ul::-webkit-scrollbar-track {
  background: rgb(0 0 0 / 67%);
}
.dtf-scriptWindow
  ul::-webkit-scrollbar-track-piece {
  background-color: unset;
  border: 3px solid rgba(155, 105, 105, 0);
  border-radius: 0px;
  width: 1px;
  height: 1px;
}
.dtf-scriptWindow
  ul::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 18px;
  box-shadow: inset 0px 0px 0px 1px rgb(41 206 145 / 12%),
    inset 0px 0px 5px 1px rgb(255 255 255 / 70%),
    inset 0px 0px 0px 1px rgb(41 206 145 / 12%);
}
.dtf-scriptWindow
  ul::-webkit-scrollbar-corner {
  background-color: unset;
}

.dtf-scriptWindow .itemsList.edit {
  max-height: 84px;
  display: flex;
  padding: 5px;
  margin: 3px 0px 3px 0px;
  gap: 7px 7px;
  border-radius: 3px;
  outline: unset;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  box-shadow: 0px 0px 3px 0px rgb(0 0 0);
  overflow-y: auto;
}
.dtf-scriptWindow .itemsList.edit li {
  min-width: 100px;
  max-width: max-content;
  border-radius: 3px;
  padding: 0px 4px 0px 3px;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0);
  display: inline-block;
}
.dtf-scriptWindow
  .itemsList.edit
  li
  div {
  min-width: 65px;
  font-size: 14px;
  padding: 3px;
  outline: none;
  float: left;
}
.dtf-scriptWindow
  .itemsList.edit
  li
  button {
  border-radius: 50%;
  font-size: 10px;
  margin: 2px 0px 0px 0px;
  padding: 0px 2px 0px 2px;
  float: right;
}

.dtf-scriptWindow ul.itemsList.view {
  display: flex;
  grid-gap: 5px 5px;
  flex-wrap: wrap;
  margin: 5px 0px 5px 4px;
  border-left: 4px solid red;
  padding: 0px 0px 0px 6px;
  border-radius: 3px;
}

.dtf-scriptWindow
  ul.itemsList.view.hor {
  display: flex;
  grid-gap: 5px 5px;
  margin: 5px 0px 5px 4px;
  border-left: 4px solid red;
  padding: 0px 7px 0px 6px;
  border-radius: 3px;
  max-height: 200px;
  overflow-y: auto;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  overscroll-behavior: contain;
}
.dtf-scriptWindow
  .itemsList.view.hor
  li {
  display: flex;
  gap: 5px 5px;
  flex-direction: row;
  justify-content: space-between;
}
.dtf-scriptWindow
  .itemsList.view.hor
  .btnCont {
  flex-direction: row;
}

.dtf-scriptWindow
  .itemsList.view.fullHor {
  display: flex;
  gap: 5px 5px;
  padding: 3px 0px 3px 5px;
  max-height: 53px;
  overflow-y: auto;
}
.dtf-scriptWindow
  .itemsList.view.fullHor
  li {
  padding: 2px 2px 2px 2px;
  border-radius: 2px;
  box-shadow: 0px 0px 3px rgb(0 0 0);
  gap: 0px 6px;
}
.dtf-scriptWindow
  .itemsList.view.fullHor
  .value {
  min-width: 50px;
}

.dtf-scriptWindow .itemsList.view li {
  display: flex;
}
.dtf-scriptWindow .itemsList .value {
  font-size: 13px;
  font-weight: 500;
  white-space: pre-wrap;
}
.dtf-scriptWindow .view .hidden {
  display: none;
}
.dtf-scriptWindow .view .btnCont {
  display: flex;
  flex-direction: column;
  margin: 0px 0px 0px 6px;
  grid-gap: 3px 3px;
}

.dtf-scriptWindow
  .itemsList
  .btnCont.hor {
  flex-direction: row;
}
.dtf-scriptWindow
  .itemsList
  .btnCont.ver {
  flex-direction: column;
}
.dtf-scriptWindow
  .itemsList
  .btnCont.grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 0px 4px;
}
.dtf-scriptWindow .itemsList button {
  padding: 0px 2px 1px 2px;
  font-size: 10px;
  height: max-content;
  position: relative;
  border-radius: 50%;
}
.dtf-scriptWindow
  .itemsList
  button.c1 {
  color: rgb(255 255 255);
  background-color: rgb(169 65 144);
}

.dtf-scriptWindow .itemsList {
  border-left: 4px solid red;
  border-radius: 3px 0px 0px 3px;
  padding: 0px 0px 0px 5px;
}
.dtf-scriptWindow .itemsList .value {
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  white-space: pre-wrap;
  outline: none;
}

.dtf-scriptWindow .textInfo {
  display: flex;
  flex-direction: column;
  gap: 7px 5px;
}

.dtf-scriptWindow legend {
  cursor: pointer;
}

.dtf-scriptWindow input[type="checkbox"] {
  display: flex;
  background-color: rgb(0 0 0);
  padding: 2px;
  margin: unset;
  aspect-ratio: 1/1;
  appearance: none;
  justify-content: center;
  align-items: center;
  border: unset;
  border-radius: 50%;
  box-shadow: 0 0 2px 1px rgb(255 255 255);
  cursor: pointer;
}
.dtf-scriptWindow input[type="checkbox"]::before {
  display: block;
  content: '✅\uFE0E';
  content: '✔\uFE0E';
  font-size: 10px;
  background-color: rgb(74 74 74);
  color: rgb(131 131 131);
  border-radius: 50%;
  font-weight: 500;
  line-height: calc(10px / 2);
  aspect-ratio: 1/1;
  padding: 4px 2px 0px 2px;
}

.dtf-scriptWindow input[type="checkbox"]:checked {
  background-color: rgb(0 0 0);
}
.dtf-scriptWindow input[type="checkbox"]:checked::before {
  background-color: rgb(255 255 255);
  color: rgb(0 0 0);
  font-weight: 800;
}
`;
