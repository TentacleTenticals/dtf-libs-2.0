class Css{
  constructor(title, style){
    this.css=document.createElement('style');
    title ? this.css.setAttribute('stylename', title) : '';
    this.css.textContent=style;
    document.body.appendChild(this.css);
  }
};
function obs({target, cfg, mode, check, type, search, name, msg, func}){
  if(!target) return;
  if(mode === 'start'){
    const callback = (mutationList, o) => {
      for(const mutation of mutationList){
        if(mutation.type === 'childList'){
          // console.log(mutation.target);
          if(check){
            if(!mutation.target.classList.length > 0) return;
            if(!mutation.target.classList.value.match(search)) return;
          }
          if(type){
            func(mutation.target);
          }else{
            for(let i = 0, arr = mutation.addedNodes; i < arr.length; i++){
              func(arr[i]);
            }
          }
        }
      }
    };
    obs[name] = new MutationObserver(callback);
    obs[name].observe(target, cfg);
    console.log(`[OBS ${name}] запущен`);
  }else
  if(mode === 'restart'){
    if(obs[name]){
      obs[name].disconnect();
      obs[name].observe(target, cfg);
      console.log(`[OBS ${name}] перезапущен`);
    }
  }
};
function onPageLoad(run){
  {
  const log = console.log.bind(console);
  console.log = (...args) => {
    if(Array.isArray(args)){
      if(args[0]){
        if(typeof args[0] === 'string'){
          if(args[0].match(/\[ Air \] Ready.*/)){
            run();
          }
        }
      }
    }
    log(...args);
  }}
};
