class Tabber{
  rewriteText({target, text, mode}){
    target.textContent = text ? text : (mode === '++' ? ++target.textContent : --target.textContent);
  }
  getDate(d){
    let t = new Date(d * 1000);
    return `${t.getFullYear()}-${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}-${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()}`
  };
  tab({path, onclick, text, tName, name}){
    new El().Div({
      path: path,
      cName: `tb ${name}`,
      onclick: (e) => {
        e.currentTarget.children[0].click();
        if(onclick) onclick(e);
      },
      func: (t) => {
        new El().Input({
          path: t,
          type: 'radio',
          text: text,
          name: `tab ${tName}`,
          value: name,
          onchange: (e) => {
            e.currentTarget.parentNode.parentNode.parentNode.setAttribute('picked', e.currentTarget.value);
          }
        })
        new El().Div({
          path: t,
          cName: 'tab',
          text: text
        })
      }
    });

  }
  tabList({path, title, titleBtn, tabs, body}){
    new El().Div({
      path: path,
      cName: 'tabber',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: title,
          onclick: () => {
            m.classList.toggle('panelHidden');
          }
        });

        new El().Div({
          path: m,
          cName: 'tabs',
          func: (t) => tabs.forEach(e => {
            this.tab({
              path: t,
              text: e.text,
              tName: title,
              name: e.name,
              onclick: e.onclick
            });
          })
        });

        new El().Div({
          path: m,
          cName: 'panel'
        });

        new El().Div({
          path: m,
          cName: 'data',
          func: (d) => body && body(d, m.children[2])
        });

        // if(tabs) tabs.forEach(e => {
        //   this.tab({
        //     path: m.children[1],
        //     text: e.text,
        //     name: e.name,
        //     func: e.func
        //   })
        // });

        // if(body) body(m);
      }
    });
    // new El().Div({
    //   path: this.header,
    //   cName: 'title',
    //   text: title
    // });
    

    // new El().Div({
    //   path: this.main,
    //   cName: 'feeds'
    // });

    
  }
}
