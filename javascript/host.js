// Host

const CONST = {
    PARAM_CHANGE: "ParamChange",
    TRUSTED_ORIGIN: "https://app.eightfold.ai",
    IFRAME : "https://app.eightfold.ai/careers?domain=bayer-sandbox.com"
}

if (window.addEventListener) {
    window.addEventListener("message", onPostMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onPostMessage, false);
}

function onPostMessage(event) {
    if (event.origin !== CONST.TRUSTED_ORIGIN) return;
    console.log('INSIDE POSTMESSAGE');
    if( CONST.PARAM_CHANGE === event.data.type ){
        iframeBridge.updateParams(event.data.payload)
    }
}
let iframeBridge = {
    updateParams : (newparams) => {

        var searchParams = new URLSearchParams(window.location.search)
        for( let pkey in newparams) {
            searchParams.set(pkey, newparams[pkey]);
        }
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        console.log('INSIDE IFRAMEBRIDGE :', newRelativePathQuery)
        history.pushState(null, '', newRelativePathQuery);
    }, 

    loadFrame : () => {
        const iframe_src = new URL(CONST.IFRAME);
        iframe_src.searchParams.set("pid",new URL(window.location).searchParams.get("pid"))
        document.getElementById("efPCS").setAttribute("src", iframe_src)
    }
}