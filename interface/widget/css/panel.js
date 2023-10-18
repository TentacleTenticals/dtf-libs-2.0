const widgetCss = () => `
.widgetPanel {
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  position: fixed;
  top: 58px;
  width: 265px;
  z-index: 20;
}

.widgetPanel .sidePanel {
  display: flex;
  flex-direction: column;
  background: repeating-linear-gradient(315deg, rgb(95 22 22), transparent 80%);
  background-color: rgb(0,0,0);
  border-radius: 0 4px 2px 5px;
  box-shadow: 0 0 3px 0px rgb(0,0,0);
  z-index: 1;
}
.widgetPanel .sidePanel:hover {
  width: max-content;
}
.widgetPanel .sidePanel>.header {
  padding: 1px 3px 1px 3px;
  font-size: 12px;
  text-align: center;
  color: rgb(255,255,255);
  cursor: pointer;
}
.widgetPanel .sidePanel>.header:hover {
  opacity: 0.9;
}

.widgetPanel .sidePanel>.list {
  display: none;
  padding: 5px;
}

.widgetPanel .sidePanel:hover .header {
  background-color: rgb(57 57 57);
}
.widgetPanel .sidePanel:hover .header+.list {
  display: flex;
  flex-direction: column;
}

.widgetPanel .sidePanel:hover+.mainPanel .w-list {
    display: flex;
}

.widgetPanel .sidePanel.active+.mainPanel {
  position: relative;
}
.widgetPanel .sidePanel.active>.header {
  background-color: rgb(57 69 97);
}
.widgetPanel .sidePanel.active>.header+.list {
  display: flex;
  flex-direction: column;
}

.widgetPanel .w-button {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 25px;
  height: 25px;
  background-color: unset;
  border: 1px solid rgb(80,80,80);
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  line-height: 0;
  margin: auto;
}
.widgetPanel .w-button.active {
  box-shadow: inset 0 0 6px 2px rgb(175 76 187);
}

.widgetPanel .mainPanel {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: absolute;
}

.widgetPanel .mainPanel:hover .w-list {
  display: flex;
}

.widgetPanel .mainPanel>.header {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 8px;
  margin: 3.5px 0 0 0;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  box-shadow: inset 3px 0 4px 0px rgb(30 94 133);
  border-radius: 0 10px 0 0;
  cursor: pointer;
}
.widgetPanel .mainPanel>.header::after {
  display: block;
  position: relative;
  content: '...';
  font-size: 18px;
  line-height: 0;
  color: rgb(255,255,255);
  top: -1px;
}
.widgetPanel .mainPanel>.header:hover {
  opacity: 0.9;
}

.widgetPanel .mainPanel.active>.header+.w-list {
  display: flex;
}
.widgetPanel .mainPanel>.header.active {
  background-color: rgb(61 72 81);
}
.widgetPanel .mainPanel>.header.active+.w-list {
  display: flex;
}

.widgetPanel .w-list {
  display: none;
  flex-direction: column;
  gap: 5px 0;
  padding: 2px 1px 3px 1px;
  background-color: rgb(0,0,0);
}

.widgetPanel .w-list .wl-item {
  display: none;
  flex-direction: column;
  gap: 3px 0;
  padding: 1px 1px 2px 1px;
  background-color: rgb(55 55 55);
}
.widgetPanel .w-list .wl-item.active {
  display: flex;
}

.widgetPanel .w-list .wl-item>.header {
  text-align: center;
  font-size: 13px;
  background-color: rgb(28 28 28);
  color: rgb(255,255,255);
  border: 1px dashed rgb(0,0,0);
  border-radius: 2px;
  cursor: pointer;
}
.widgetPanel .w-list .wl-item>.header:hover {
  opacity: 0.9;
}

.widgetPanel .w-list .wl-item>.list {
  display: flex;
  flex-direction: column;
  text-align: center;
}
`
