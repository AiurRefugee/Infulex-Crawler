import gsap from "gsap";

export function calScroll(scrollView, event) {
    // const height = event.target.scrollTop;
    const scrollTitle = scrollView
        .querySelector("#scrollTitle")
    var rect = null 
    if( !scrollTitle ) {
        return false
    }
    rect = scrollTitle.getClientRects()[0];
    const threshold = (rect.top + rect.bottom) / 2;
    const header = scrollView.querySelector("header");
    const title = header.querySelector("h1");
    const divider = header.querySelector(".divider"); 
    if (threshold < 0) { 
        gsap.to(title, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
        header.style.background = 'rgb(0 0 0 / 40%)'
        if (threshold < -36) {
            // gsap.to(divider, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
            header.style['backdropFilter'] = 'blur(100px)'
            header.style['-webkit-backdrop-filter'] = 'blur(100px)'
            

        } else {
            // gsap.to(divider, { duration: 0.25, opacity: 0, ease: "power1.inOut" });
            header.style['backdropFilter'] = 'none'
            header.style['-webkit-backdrop-filter'] = 'none' 
        }
    } else {
 
        gsap.to(title, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
        header.style.background = ''
        // gsap.to(divider, { duration: 0.2, opacity: 0, ease: "power1.inOut" });

    }
}