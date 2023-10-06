class CtxMenu{
  separator(c){
    new El().Div({
      path: c.path,
      cName: 'separator',
      text: c.text
    });
  }
  button(c){
    new El().Button({
      path: c.path,
      cName: c.cName,
      title: c.title,
      text: c.text,
      onclick: c.onclick
    });
  }
  sub(c){
    new El().Div({
      path: c.path,
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
          text: c.text,
          title: c.title
        });
        const list=new El().Div({
          path: main,
          cName: `list${c.cName && ' '+c.cName||''}`,
          rtn: true
        });
        if(c.items) c.items.forEach(e => {
          this[e.type]({
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
  build(c){
    new El().Div({
      path: c.path,
      cName: 'ctx',
      tab: -1,
      focus: c.focus,
      onblur: (e) => {
        // if(!c.autohide) return;
        if(c.onblur) c.onblur(e.target);
        if(c.autohide) setTimeout(() => {
          e.target.remove();
        }, 1000);
      },
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: c.header
        });
        new El().Div({
          path: m,
          cName: 'list',
          func: (b) => {
            if(c.load) new El().loading({
              path: b,
              theme: c.loadTheme,
              text: c.loadText
            });
            // if(c.func) c.func(this, b);
            if(c.func){
              if(!c.load && c.items){
                c.func(b);
                c.items.forEach(e => {
                  this[e.type]({
                    path: b,
                    cName: e.cName,
                    text: e.text,
                    title: e.title,
                    onclick: e.onclick,
                    items: e.items
                  });
                });
              }
              else
              if(c.load){
                new Promise((res, err) => {
                  c.func({path:b, res:res, err:err});
                }).then(res => {
                  console.log(res);
                  b.children[0].remove();
                  if(c.items) c.items.forEach(e => {
                    this[e.type]({
                      path: b,
                      cName: e.cName,
                      text: e.text,
                      title: e.title,
                      onclick: e.onclick,
                      items: e.items
                    });
                  });
                })
              }
            }
          }
        });
        // if(c.autoFocus) m.focus();
      }
    });
  }
}
