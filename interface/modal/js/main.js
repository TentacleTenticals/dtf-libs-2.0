class Modal{
  build(c){
    new El().Dialog({
      path: c.path,
      cName: 'modal',
      show: c.show,
      showM: c.showM,
      modal: c.modal,
      onclose: c.onclose,
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: c.title,
          onclick: () => {
            m.close();
          }
        });
        new El().Form({
          path: m,
          cName: 'main',
          func: (fo) => {
            if(c.load) new El().loading({
              path: fo,
              text: c.loadText||''
            });
            if(c.func) c.func(fo);
            // new El().Div({
            //   path: fo,
            //   func: (main) => c.func(main)
            // });
          }
        });
        if(c.submit) new El().Button({
          path: m,
          type: 'submit',
          text: c.tSubmit||'Отправить',
          onclick: () => c.submit(m.children[1])
        });
      }
    });
  }
}
