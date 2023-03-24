class InfoMenu {
  constructor(func){
    if(document.getElementById('DTF-scriptInfo')) return;
    this.main=new Div({
      path: document.body,
      cName: 'dtf-scriptWindow info',
      id: 'DTF-scriptInfo',
      rtn: []
    });

    this.header=new Div({
      path: this.main,
      cName: 'header',
      rtn: [],
      onclick: () => {
        this.main.remove();
      }
    });
    this.label=new Div({
      path: this.header,
      cName: 'label',
      text: `Инфо ${defaultSettings['scriptInfo'].scriptName}`
    });

    this.form=new Form({
      path: this.main,
      rtn: []
    });

    if(func) func(this.form, mainCfg);
  }
};
