class DataMenu {
  constructor(func){
    if(document.getElementById('DTF-scriptData')) return;
    this.main=new Div({
      path: document.body,
      cName: 'dtf-scriptWindow data',
      id: 'DTF-scriptData',
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
      text: `Данные ${defaultSettings['scriptInfo'].scriptName}`
    });

    this.form=new Form({
      path: this.main,
      name: 'data',
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
//       inputs: {containers:true,
//         list:[
//         {
//           type: 'file',
//           name: 'load backup settings',
//           title: 'Загрузка настроек из .txt файла',
//           accepted: '.txt',
//           text: 'Загрузить настройки из бэкапа',
//           onchange: (e) => {
//             readSettingsBackup(this.submit, e);
//           }
//         }
//       ]}
    });
    
    this.submit=new Button({
      path: this.form,
      text: 'Сохранить данные',
      container: true,
      rtn: ['container'],
      onclick: () => {
        new Db().settingsUpdater(dbGen(defaultSettings['scriptInfo']), mainCfg, false);
        this.main.remove();
      }
    });

    new Button({
      path: this.dataActions,
      text: 'Бэкап настроек в файл',
      title: 'Сохранение настроек в .txt файл',
      onclick: () => {
        backupSettingsToFile(JSON.stringify(mainCfg, null, 2), `${mainCfg.srciptInfo.scriptName} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    });
  }
};
