export class Alerter{
  constructor(El, o){
    if(!document.getElementById('alerterField')){
      El.Div({
        path: document.body,
        id: 'alerterField'
      });
    }
    this.build(El, o);
  }
  build(El, o){
    El.Div({
      path: document.getElementById('alerterField'),
      class: 'alerter' + (!o.alert ? ' info' : ' err'),
      func: (m) => {
        
        El.Div({
          path: m,
          class: 'header',
          func: (h) => {
            El.Div({
              path: h,
              class: 'type',
              text: o.title
            });
            El.Div({
              path: h,
              class: 'scriptName',
              text: o.GM && o.GM.info.script.name||info.script.name
            });
          }
        });

        El.Div({
          path: m,
          class: 'text',
          text: o.text
        });
        
        if(o.timer){
          setTimeout(() => {
            m.classList.add('hide');
            setTimeout(() => {
              m.remove();
            }, 2000);
          }, o.timer);
        }
      }
    });
  }
}
