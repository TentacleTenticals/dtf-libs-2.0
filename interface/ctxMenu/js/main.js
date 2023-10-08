class CtxMenu{
  separator({path, text}){
    new El().Div({
      path: path,
      cName: 'separator',
      text: text
    });
  }
  loading(c){
    new El().Loading({
      path: c.path,
      text: c.text
    })
  }
  button({path, cName, title, text, onclick}){
    new El().Button({
      path: path,
      cName: cName,
      title: title,
      text: text,
      onclick: onclick
    })
  }
  sub({path, cName, text, title, items}){
    new El().Div({
      path: path,
      cName: 'sub',
      func: (s) => {
        const main=new El().Div({
          path: s,
          cName: 'subList',
          rtn: true
        });
        new El().Div({
          path: s,
          cName: 'header',
          text: text,
          title: title
        });
        const list=new El().Div({
          path: main,
          cName: `list${cName && ' '+cName||''}`,
          rtn: true
        });
        if(items) items.forEach(e => {
          if(e) this[e.type]({
            path: list,
            cName: e.cName,
            title: e.title,
            text: e.text,
            onclick: e.onclick
          });
        })
      }
    })
  }
  build({path, title, items, focus, autohide, e}){
    new El().Div({
      path: path,
      cName: 'contextMenu',
      style: `
        top: ${e.top + (window.scrollY||window.scrollHeight||0)}px;
        left: ${e.left}px;
      `,
      tab: -1,
      focus: focus,
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: title
        });
        this.list=new El().Div({
          path: m,
          cName: 'list',
          rtn: true
        });
      },
      onblur: (e) => {
        if(!autohide) return;
        setTimeout(() => {
          e.target.remove();
        }, 1000);
      }
    });

    if(items) items.forEach(e => {
      this[e.type]({
        path: this.list,
        cName: e.cName,
        text: e.text,
        title: e.title,
        onclick: e.onclick,
        items: e.items
      });
    });
  }
}
