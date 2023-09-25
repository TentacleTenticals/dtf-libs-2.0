const openerCss = () => `
.DTF-scriptSettingsOpener {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  position: absolute;
  top: 33%;
  right: 20%;
  width: fit-content;
  padding: 2px;
  border-radius: 1px;
  background-color: rgb(255,255,255);
  box-shadow: 0 0 2px 1px rgb(0,0,0);
  z-index: 100;
}
.DTF-scriptSettingsOpener>.header {
  display: flex;
  justify-content: center;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  border-radius: 3px;
}

.DTF-scriptSettingsOpener .header>.label {
  display: none;
}
.DTF-scriptSettingsOpener:hover .header>.label {
  display: block;
}
.DTF-scriptSettingsOpener .header>.icon {
  display: flex;
  font-size: 15px;
  line-height: 15px;
  padding: 3px 0 0 0;
}

.DTF-scriptSettingsOpener .header+.list {
  display: none;
  flex-direction: column;
  gap: 5px 0;
}
.DTF-scriptSettingsOpener:hover .header+.list {
  display: flex;
}

.DTF-scriptSettingsOpener .header+.list>.container {
  display: flex;
  flex-direction: row;
  gap: 0 3px;
  background-color: rgb(221 239 249);
  box-shadow: 0 0 2px 0px rgb(0,0,0);
}

.DTF-scriptSettingsOpener .scriptName {
  font-size: 13px;
  font-weight: 600;
}`;
