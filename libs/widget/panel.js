class WidgetPanel{
  constructor({bText, hText, cName, id, items}){
    if(!document.getElementById('widgetPanel')) this.build();
    const widget = document.getElementById('widgetPanel');
    
    this.wItem({bText:bText, hText:hText, cName:cName, id:id, items:items})
  }
  build(){
    // const widget = document.getElementById('widgetPanel');
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
      const wList=new El().Div({
        path: mainPanel,
        cName: 'w-list',
        rtn: true
      })
  }
  wItem({bText, hText, cName, id, items}){
    const widget = document.getElementById('widgetPanel');
    const btn=new El().Button({
      path: widget.children[0].children[1],
      cName: 'w-button',
      text: bText,
      rtn: true,
      onclick: (e) => {
        wItem.classList.toggle('active');
        btn.classList.toggle('active');
      }
    });
    
    const wItem=new El().Div({
      path: widget.children[1].children[1],
      cName: `w-item ${cName}`,
      id: `w-${id}`,
      rtn: true
    });
    new El().Div({
      path: wItem,
      cName: 'header',
      text: hText,
      onclick: (e) => {
        wItem.classList.toggle('active');
        btn.classList.toggle('active');
      }
    })
    new El().Div({
      path: wItem,
      cName: 'list',
      func: (l) => items(l)
    })
  }
}
