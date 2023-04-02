function onLoad(run){
  const log = console.log;
  console.log = function (msg) {
    if(msg.match(/\[ Air \] Ready.*/)){
      run('Page ready');
    }else
    if(msg.match(/\[Editor in popup\] Ready/)){
      run('Editor ready');
    }else
    if(msg.match(/\[Editor in popup\] Closed/)){
      run('Editor closed');
    }
    log.apply(console, arguments);
  };
}
