class Dialog{
  build(c){
    new El().Div({
      path: c.path,
      style: c.coord && `
        top: ${c.coord.top + (window.scrollY||window.scrollHeight||0)}px;
        left: ${c.coord.left}px;
      `,
      cName: 'dialog',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: c.title||'Dialog',
          onclick: () => {
            m.remove();
          }
        });

        new El().Form({
          path: m,
          func: (form) => {
            c.func(form);

            new El().Input({
              path: form,
              type: 'submit',
              value: c.submitText,
              onclick: () => c.submit(form)
            });
          }
        });
      }
    })
  }
};
