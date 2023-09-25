const tabberCss = () => `
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');

.tabber {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
}
.tabber.panelHidden .panel {
  max-height: 29px;
  overflow: hidden;
}

.tabber>.header {
  display: flex;
  justify-content: center;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
}
.tabber>.header .title {
  color: rgb(255,255,255);
}
.tabber>.header .title::before {
  display: block;
  position: relative;
  content: '';
  max-width: 100%;
  top: 50%;
  left: -115%;
  border-top: 1px solid rgb(237 73 153);
  box-shadow: 0 0 2px 1px rgb(227 98 98);
}
.tabber>.header .title::after {
  display: block;
  position: relative;
  content: '';
  max-width: 100%;
  top: -50%;
  left: 115%;
  border-top: 1px solid rgb(237 73 153);
  box-shadow: 0 0 2px 1px rgb(227 98 98);
}

.tabber .tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px 5px;
  padding: 3px 2px 3px 2px;
  background-color: rgb(0,0,0);
}
.tabber .tabs .tab:hover {
  filter: brightness(1.2);
}

.tabber .panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 7px;
  max-width: 100%;
  padding: 5px;
  background-color: rgb(39 38 38);
  color: rgb(255 255 255);
  box-shadow: inset 0 0 3px 0px rgb(255 255 255);
}
.tabber .panel .load {
  flex-grow: 1;
  flex-basis: 100%;
  color: rgb(255,255,255);
  box-shadow: 0 0 2px 1px rgb(255,255,255);
}
.tabber .panel .srch {
  flex-grow: 1;
  height: fit-content;
  color: rgb(255,255,255);
  box-shadow: 0 0 2px 1px rgb(255,255,255);
}

.tabber .tabs .tab {
  display: flex;
  justify-content: center;
  gap: 0 5px;
  padding: 0 3px 0 3px;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Sofia Sans Semi Condensed', sans-serif;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  box-shadow: inset 0 0 4px 0px rgb(255,255,255);
  cursor: pointer;
}
.tabber .tabs .tb input {
  display: none;
  appearance: none;
}

.tabber .tabs input:checked+.tab {
  background-color: rgb(75 10 40);
}
`
