class SettingsOpener{
  SettingsItem(name, id){
    const main=document.createElement('div');
    main.className='container';
    main.id=`stg-DTF-${id}`;
    document.getElementById('DTF-scriptSettingsOpener').children[2].appendChild(main);

    new Div({
      path: main,
      cName: 'scriptName',
      text: name
    });

    new Button({
      path: main,
      text: '🔧',
      cName: 'main',
      disabled: setSettings ? '' : true,
      onclick: () => {
        if(setSettings) new SettingsMenu(setSettings);
      }
    });

    new Button({
      path: main,
      text: '💾',
      cName: 'main',
      disabled: setData ? '' : true,
      onclick: () => {
        if(setData) new DataMenu(setData);
      }
    });

    new Button({
      path: main,
      text: '❓',
      cName: 'main',
      dispabled: setInfo ? '' : true,
      onclick: () => {
        if(setInfo) new InfoMenu(setInfo);
      }
    });
  };
  constructor({scriptName, scriptId}){
    if(document.getElementById('DTF-scriptSettingsOpener')) return;
    // console.log(settings)
    this.main=new Div({
      path: document.querySelector(`.site-header-container`) ? document.querySelector(`.site-header-container`) : document.body,
      cName: 'DTF-scriptSettingsOpener',
      id: 'DTF-scriptSettingsOpener',
      rtn: []
    });

    this.label=new Div({
      path: this.main,
      cName: 'label',
      text: 'Настройки скриптов'
    });
    this.header=new Div({
      path: this.main,
      cName: 'header',
      text: '🛠️'
    });
    this.list=new Div({
      path: this.main,
      cName: 'list'
    });

    this.SettingsItem(scriptName, scriptId);
  }
};
