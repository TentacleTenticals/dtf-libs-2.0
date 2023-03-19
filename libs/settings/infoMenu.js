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

    // this.container=new Div({
    //   path: this.main,
    //   cName: 'content',
    //   rtn: []
    // });

    // new Button({
    //   path: this.header,
    //   text: '❌',
    //   title: 'Закрыть инфо',
    //   onclick: () => {
    //     this.main.remove();
    //   }
    // })

    this.form=new Form({
      path: this.main,
      rtn: []
    });

    if(func) func(this.form, mainCfg);
  }
};





class Uploader {
  constructor({path, host, pattern, adder}){
    this.main=document.createElement('div');
    this.main.style=`
    display: grid;
    grid-template-columns: repeat(2, max-content);
    justify-content: start;
    row-gap: 10px;
    column-gap: 5px;`
    path.appendChild(this.main);

    this.checker=document.createElement('div');
    this.checker.className='checker';
    this.main.appendChild(this.checker);

    this.button=document.createElement('div');
    this.button.className='btn';
    this.button.textContent=host;
    this.button.onclick=() => {
      if(this.input.disabled){
        this.input.disabled=false;

        this.adder=document.createElement('div');
        this.adder.id=`${host}Adder`;
        this.adder.tabindex=this.adder.setAttribute('tabindex', '-1');
        this.adder.style=`
          position: absolute;
          background: black;
          color: white;
          margin-top: -65px;`
          this.adder.onblur=() => {
            setTimeout(() => {
              this.adder.remove();
            }, 1000);
          }
        this.main.appendChild(this.adder);
        this.adder.focus();

        this.title=document.createElement('div');
        this.title.textContent=adder.text;
        this.adder.appendChild(this.title);

        this.link=document.createElement('a');
        this.link.href=adder.linkUrl;
        this.link.textContent=adder.linkText;
        this.link.target='_blank';
        this.adder.appendChild(this.link);
      }else{
        this.input.disabled=true;
        if(this.main.querySelector(`div[id=${host}Adder]`)) this.main.querySelector(`div[id=${host}Adder]`).remove();
      }
    }
    this.main.appendChild(this.button);

    this.input=new Input({
      path: path,
      text: `${host} токен`,
      disabled: true,
      pattern: pattern,
      onchange: adder.onchange,
      value: mainCfg['album items upload sites'][host] ? JSON.stringify(mainCfg['album items upload sites'][host]) : '',
      type: 'password'
    })

    if(mainCfg['album items upload sites'][host]){
      this.checker.textContent='✅';
      if(host === 'Imgur'){
        if(mainCfg['album items upload sites'][host].time){
          let time = luxon.DateTime;

          if(time.fromISO(mainCfg['album items upload sites'][host].time).plus({days:20}) > time.local()) this.checker.textContent='✅';

        }
      }
    }
    else
    this.checker.textContent='❌';
  }
}
