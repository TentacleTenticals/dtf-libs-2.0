const openerCss = () => `
.DTF-scriptSettingsOpener {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  position: absolute;
  right: 20%;
  width: fit-content;
  padding: 2px;
  border-radius: 1px;
  box-shadow: 0 0 2px 1px rgb(0,0,0);
}
.DTF-scriptSettingsOpener>.header {
  display: flex;
  justify-content: center;
}

.DTF-scriptSettingsOpener .header>.label {
  display: none;
}
.DTF-scriptSettingsOpener:hover .header>.label {
  display: block;
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
}`;
