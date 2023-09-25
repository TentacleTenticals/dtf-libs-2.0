function SettingsOpener(){
  new El().Div({
    path: document.querySelector(`.site-header-container`) ? document.querySelector(`.site-header-container`) : document.body,
    cName: 'DTF-scriptSettingsOpener',
    id: 'DTF-scriptSettingsOpener',
    func: (m) => {
      new El().Div({
        path: m,
        cName: 'header',
        func: (c) => {
          new El().Div({
            path: c,
            cName: 'label',
            text: 'Настройки скриптов'
          });
          new El().Div({
            path: c,
            cName: 'icon',
            text: '🛠️\uFE0E'
          });
        }
      });
      new El().Div({
        path: m,
        cName: 'list'
      });
    }
  });
};
