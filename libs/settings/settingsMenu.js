class SettingsMenu {
  constructor(func){
    if(document.getElementById('DTF-scriptSettings')) return;
    this.main=new Div({
      path: document.body,
      cName: 'dtf-scriptWindow settings',
      id: 'DTF-scriptSettings',
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
      text: `Настройки ${defaultSettings['scriptInfo'].scriptName}`
    });

    this.form=new Form({
      path: this.main,
      name: 'settings',
      rtn: []
    });

    if(func) func(this.form, mainCfg);

    this.dataActions = new Field({
      path: this.form,
      cName: 'textInfo',
      dontRead: true,
      groupName: 'data actions',
      legend: `Управление сохранёнными данными`,
      rtn: [],
      inputs: {containers:true,
        list:[
        {
          type: 'file',
          name: 'load backup settings',
          title: 'Загрузка настроек из .txt файла',
          accepted: '.txt',
          text: 'Загрузить настройки из бэкапа',
          onchange: (e) => {
            readSettingsBackup(this.submit, e);
          }
        }
      ]}
    });

    new Button({
      path: this.dataActions,
      text: 'Бэкап настроек в файл',
      title: 'Сохранение настроек в .txt файл',
      onclick: () => {
        backupSettingsToFile(JSON.stringify(cfgMain, null, 2), `${cfgMain.srciptInfo.scriptName} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    });

    this.submit=new Button({
      path: this.form,
      text: 'Сохранить настройки',
      container: true,
      rtn: ['container'],
      onclick: () => {
//         console.log('STGLIST', new Db().getSettings(document.querySelectorAll(`div[id=DTF-scriptSettings] fieldset`), false))
        new Db().settingsUpdater(dbGen(defaultSettings['scriptInfo']), new Db().getSettings(document.querySelectorAll(`div[id=DTF-scriptSettings] fieldset`)), {firstRun: false});
        this.main.remove();
      }
    });
    new Button({
      path: this.submit.container,
      text: 'Сбросить настройки',
      onclick: () => {
        mainCfg = defaultSettings;
        console.log(`Сброшены настройки, десу.`, mainCfg);
        this.main.remove();
      }
    });
  }
};
