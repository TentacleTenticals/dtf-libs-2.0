function wItem({bText, hText, cName, id, items}){
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
      cName: `wl-item ${cName}`,
      id: `wl-${id}`,
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
    });
    new El().Div({
      path: wItem,
      cName: 'list',
      func: (l) => items(l)
    });
  };
