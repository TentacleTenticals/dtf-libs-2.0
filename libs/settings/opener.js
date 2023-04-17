const initMenu = {};
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
      disabled: initMenu.setSettings ? false : true,
      onclick: () => {
        if(initMenu.setSettings) new SettingsMenu(initMenu.setSettings);
      }
    });

    new Button({
      path: main,
      text: '💾',
      cName: 'main',
      disabled: initMenu.setData ? false : true,
      onclick: () => {
        if(initMenu.setData) new DataMenu(initMenu.setData);
      }
    });

    new Button({
      path: main,
      text: '❓',
      cName: 'main',
      disabled: initMenu.setInfo ? false : true,
      onclick: () => {
        if(initMenu.setInfo) new InfoMenu(initMenu.setInfo);
      }
    });
  };
  Build(){
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
  }
  constructor({scriptName, scriptId}){
    if(!document.getElementById('DTF-scriptSettingsOpener')) this.Build();

    if(!document.getElementById('DTF-scriptSettingsOpener').querySelector(`div[id='stg-DTF-${id}']`)) this.SettingsItem(scriptName, scriptId);
  }
};
