let watchUrlUpdate = () => {
    const CONST = {
        PARAM_CHANGE: "ParamChange",
        TRUSTED_DOMAINS: {
            "suryaeightfold.github.io": 1 // This dict should hold all our white listed URLs
        }
    }

    if(new URL(document.referrer).hostname in CONST.TRUSTED_DOMAINS){ // restricting to while listed URLs in TRUSTED_DOMAINS
        document.querySelectorAll(".card.position-card").forEach( (e)=> {
            e.addEventListener("click", () => {
                setTimeout(()=>{
                    
                    // PostMessage to be called , whenever URL changes in response to filter/job selection
                    // The payload should contain all url params of eightfold page, after page mutation.
                    // Timeout to wait for mutations in your POC page. Obviously you can ignore this.
                    const payload = {
                        pid: new URLSearchParams(window.location.search).get('pid')
                    }
                    
                    parent.postMessage({
                        type: CONST.PARAM_CHANGE,
                        payload
                    }, document.referrer);
                    
                }, 500)
                
            })
        })
    }
    
}
watchUrlUpdate();
