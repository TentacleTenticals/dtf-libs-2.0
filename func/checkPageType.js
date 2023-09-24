function getPageType(url){
  if(!url){
    console.log('[GetPageType] error - no url');
    return;
  }
  url.replace(/https:\/\/dtf\.ru\/([^]+)/, (d, text) => {
    let arr = text.split('/');
    
    switch(true){
      case arr[0] && arr[0].match(/^popular$/):{
        if(!arr[1]) url = {type: 'popular'};
      }break;

      case arr[0] && arr[0].match(/^new$/):{
        if(!arr[1]) url = {type: 'new'};
      }break;

      case arr[0] && arr[0].match(/^my$/):{
        if(arr[1] && arr[1].match(/^new$/)) url = {type: 'my new'};
      }break;

      case arr[0] && arr[0].match(/^bookmarks$/):{
        if(!arr[1]) url = {type: 'bookmarks'};
      }break;

      case arr[0] && arr[0].match(/^u$/):{
        if(arr[1] && !arr[2]) url = {type: 'user page', name: arr[1]};
      else
        if(arr[1] && arr[2]) url = {type: 'topic'};
      }break;
        
      case arr[0] && arr[0].match(/^s$/):{
        if(arr[1] && !arr[2]) url = {type: 'subsite', name: arr[1]};
      else
        if(arr[1] && arr[2]) url = {type: 'topic'};
      }break;
        
      case arr[0] && !arr[0].match(/^(u|s)$/):{
        if(arr[0] && !arr[1]) url = {type: 'subsite', name: arr[0]};
      else
        if(arr[0] && arr[1]) url = {type: 'topic'};
      }break;
        
    }
  })
  return url;
}