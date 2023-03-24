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
        settingsUpdater(db, getSettings(document.querySelectorAll(`.DTF-scriptSettings list fieldset`)), {firstRun: false});
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





// export class Uploader {
//   constructor({path, host, pattern, adder}){
//     this.main=document.createElement('div');
//     this.main.style=`
//     display: grid;
//     grid-template-columns: repeat(2, max-content);
//     justify-content: start;
//     row-gap: 10px;
//     column-gap: 5px;`
//     path.appendChild(this.main);

//     this.checker=document.createElement('div');
//     this.checker.className='checker';
//     this.main.appendChild(this.checker);

//     this.button=document.createElement('div');
//     this.button.className='btn';
//     this.button.textContent=host;
//     this.button.onclick=() => {
//       if(this.input.disabled){
//         this.input.disabled=false;

//         this.adder=document.createElement('div');
//         this.adder.id=`${host}Adder`;
//         this.adder.tabindex=this.adder.setAttribute('tabindex', '-1');
//         this.adder.style=`
//           position: absolute;
//           background: black;
//           color: white;
//           margin-top: -65px;`
//           this.adder.onblur=() => {
//             setTimeout(() => {
//               this.adder.remove();
//             }, 1000);
//           }
//         this.main.appendChild(this.adder);
//         this.adder.focus();

//         this.title=document.createElement('div');
//         this.title.textContent=adder.text;
//         this.adder.appendChild(this.title);

//         this.link=document.createElement('a');
//         this.link.href=adder.linkUrl;
//         this.link.textContent=adder.linkText;
//         this.link.target='_blank';
//         this.adder.appendChild(this.link);
//       }else{
//         this.input.disabled=true;
//         if(this.main.querySelector(`div[id=${host}Adder]`)) this.main.querySelector(`div[id=${host}Adder]`).remove();
//       }
//     }
//     this.main.appendChild(this.button);

//     this.input=new Input({
//       path: path,
//       text: `${host} токен`,
//       disabled: true,
//       pattern: pattern,
//       onchange: adder.onchange,
//       value: mainCfg['album items upload sites'][host] ? JSON.stringify(mainCfg['album items upload sites'][host]) : '',
//       type: 'password'
//     })

//     if(mainCfg['album items upload sites'][host]){
//       this.checker.textContent='✅';
//       if(host === 'Imgur'){
//         if(mainCfg['album items upload sites'][host].time){
//           let time = luxon.DateTime;

//           if(time.fromISO(mainCfg['album items upload sites'][host].time).plus({days:20}) > time.local()) this.checker.textContent='✅';

//         }
//       }
//     }
//     else
//     this.checker.textContent='❌';
//   }
// }
