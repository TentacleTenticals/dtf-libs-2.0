function alerter(o){
    const main=new El().Div({
      path: document.getElementById('dtf-alertField'),
      cName: !alert ? 'dtf-alerter info' : 'dtf-alerter err',
      rtn: true,
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          func: (h) => {
            new El().Div({
              path: h,
              cName: 'type',
              text: o.title
            });
            new El().Div({
              path: h,
              cName: 'scriptName',
              text: defaultCfg.scriptInfo.name
            });
          }
        });

        new El().Div({
          path: m,
          cName: 'text',
          text: o.text
        });
      }
    });

    if(o.timer){
      setTimeout(() => {
        main.classList.add('hide');
        setTimeout(() => {
          main.remove();
        }, 3000);
      }, o.timer);
    }
  }
