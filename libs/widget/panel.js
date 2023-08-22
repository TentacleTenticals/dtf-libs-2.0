class Widget{
    main(){
      const widget = document.querySelector(`#widget`);
      if(!widget){
        this.main=new El().Div({
          path: document.body,
          cName: 'widget',
          id: 'widget',
          rtn: true
        });
        this.panel=new El().Div({
          path: this.main,
          cName: 'widgetPanel',
          rtn: true
        });
        new El().Div({
          path: this.panel,
          cName: 'header',
          text: '🗄\uFE0E',
          onclick: (e) => {
            this.main.classList.toggle('showing');
          }
        });
        this.list=new El().Div({
          path: this.panel,
          cName: 'list'
        });

        new El().Div({
          path: this.main,
          cName: 'wList'
        });

        return this.main;
      }else
      return document.querySelector(`#widget`);
    }
  }
