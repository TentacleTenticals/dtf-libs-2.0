class InfoMenu {
  constructor(func){
    new El().Div({
      path: document.body,
      cName: 'dtf-scriptWindow info scrollMid',
      id: 'DTF-scriptInfo',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: `Справка ${defaultCfg['scriptInfo'].name}`,
          onclick: () => {
            m.remove();
          }
        });

        this.form=new El().Form({
          path: m,
          name: 'info',
          func: (m) => func && func(m)
        });
      }
    });
  }
};
