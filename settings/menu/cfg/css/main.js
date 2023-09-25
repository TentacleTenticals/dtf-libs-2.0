const settingsMenuCss = () => `
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

.dtf-scriptWindow>.header {
  text-align: center;
  font-weight: 500;
  padding: 5px 0px 0px;
}

.dtf-scriptWindow legend {
  font-weight: 500;
  font-size: 15px;
}

.dtf-scriptWindow legend {
  cursor: pointer;
}

.dtf-scriptWindow.settings .iList>ul {
  background-color: rgb(0,0,0);
}
`;
