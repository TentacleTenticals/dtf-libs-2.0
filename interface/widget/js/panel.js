class WidgetPanel{
  constructor(){
    if(!document.getElementById('widgetPanel')) this.build();
  }
  build(){
      const main=new El().Div({
        path: document.body,
        cName: 'widgetPanel',
        id: 'widgetPanel',
        rtn: true
      });
      const sidePanel=new El().Div({
        path: main,
        cName: 'sidePanel',
        rtn: true
      })
      new El().Div({
        path: sidePanel,
        cName: 'header',
        text: '📱',
        onclick: () => {
          sidePanel.classList.toggle('active');
        }
      })
      const wButtonsList=new El().Div({
        path: sidePanel,
        cName: 'list',
        rtn: true
      })

      const mainPanel=new El().Div({
        path: main,
        cName: 'mainPanel',
        rtn: true
      })

      new El().Div({
        path: mainPanel,
        cName: 'header',
        onclick: (e) => {
          e.currentTarget.classList.toggle('active');
        }
      })
      new El().Div({
        path: mainPanel,
        cName: 'w-list'
      })
  }
}
