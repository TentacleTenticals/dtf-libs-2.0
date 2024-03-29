const cfgMenuCss = () => `
body:has(.dtf-scriptWindow) {
  overflow: hidden;
}

.dtf-scriptWindow {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  position: fixed;
  background-color: rgb(26 5 21);
  color: rgb(255 255 255);
  top: 0px;
  left: 0px;
  z-index: 1000;
  padding: 3px;
  max-width: 100%;
  height: 100%;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(18, 101, 134) rgb(0, 0, 0);
}

.dtf-scriptWindow>.header {
  position: relative;
  background-color: rgb(40 40 40);
  color: rgb(231 193 255);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Chakra Petch', sans-serif;
  letter-spacing: 0.5px;
  border-radius: 2px;
  box-shadow: 0 0 2px 0px rgb(255 255 255);
  cursor: pointer;
}

.dtf-scriptWindow>form {
  display: flex;
  flex-direction: column;
  gap: 6px 0;
}

.dtf-scriptWindow fieldset {
  padding: 5px;
  border: 1px solid rgb(255,255,255);
}

fieldset.hide .fList {
  display: none;
}

.dtf-scriptWindow legend {
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
}
.dtf-scriptWindow form .info {
  margin: 0 0 3px 0;
  font-size: 12px;
}
.dtf-scriptWindow form .fList {
  display: flex;
  flex-direction: column;
  gap: 5px 5px;
}

.dtf-scriptWindow :is(input, select) {
  padding: 0 2px 0 2px;
  height: fit-content;
  border: unset;
  border-radius: 2px;
  outline: none;
}
.dtf-scriptWindow select {
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  box-shadow: 0 0 2px 1px rgb(87 87 87);
}

.dtf-scriptWindow :is(input, select) {
  background-color: rgb(41 41 41);
  color: rgb(255,255,255);
  box-shadow: inset 0 0 3px 0px rgb(137 137 137);
}

.dtf-scriptWindow label :is(input, select) {
  margin: auto 0 auto 0;
}

.dtf-scriptWindow button {
  background-image: repeating-linear-gradient(315deg, rgb(0 0 0), transparent 10%);
  background-color: rgb(67 47 60);
  color: rgb(255,255,255);
  height: fit-content;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.7px;
  text-align: center;
  border: none;
  border-radius: 2px;
  box-shadow: 0 0 1px 1px rgb(141 140 140);
  cursor: pointer;
}

.dtf-scriptWindow .iList:not(.ul) {
  width: 100%;
  cursor: cell;
}
.dtf-scriptWindow .iList:not(.ul) ul {
  background-color: rgb(30 30 30);
  box-shadow: 0 0 2px 1px rgb(117 117 117);
}
.dtf-scriptWindow .iList ul .value {
  cursor: text;
}
.dtf-scriptWindow .iList ul button {
  cursor: pointer;
}

.dtf-scriptWindow>form[name=data] {
  background-color: rgb(0 0 0);
}

.dtf-scriptWindow .actions {
  display: flex;
  justify-content: center;
  gap: 5px 10px;
}

.dtf-scriptWindow .separator {
  padding: 2px 3px 2px 3px;
  margin: 0 10px 0 0;
  font-size: 12px;
  font-weight: 600;
  color: rgb(0,0,0);
  background-color: rgb(175 119 179);
  border-radius: 2px;
}

.dtf-scriptWindow input[type="color"] {
  width: 25px;
  aspect-ratio: 1/1;
}
`;
