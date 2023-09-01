const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function init(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}

init();


var timer;


function chapta(){

  xscale = 1;
  yscale = 1;
  xprev = 0;
  yprev = 0;

    window.addEventListener("mousemove", function(dets){

        clearTimeout(timer)
        var ydiff = dets.y - yprev;
        var xdiff = dets.x - xprev;

        xprev = dets.x;
        yprev = dets.y;

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        mousefollow(xscale , yscale)

        timer = setTimeout(() => {
          document.querySelector(".circle").style.transform = `translate(${dets.x}px , ${dets.y}px) scale(${1},${1})`;
        }, 100);

    })
}

chapta();


function mousefollow(xtif , ytif){
    window.addEventListener("mousemove" , function(dets){
        document.querySelector(".circle").style.transform = `translate(${dets.x}px , ${dets.y}px) scale(${xtif},${ytif})`;
    })
}

mousefollow()

var t = gsap.timeline()

t.from(".heading h1 , .heading h5 , .small h4 , .bottom h4 , .bottom .arrow" , {
    y : 100,
    // transform : translate("100px", "100px"),
    duration:1,
    opacity : 0,
    stagger : 0.2
})

document.querySelectorAll(".elem").forEach(function(chacha){

    var prev = 0;
    var diffrot  = 0;

    chacha.addEventListener("mousemove" , function(dets){
        var differ = dets.y - chacha.getBoundingClientRect().top -"70px";
        diffrot = dets.x - prev;
        prev = dets.x;
        gsap.to(chacha.querySelector("img"),{
        opacity:1,
        ease : Power4,
        top: differ,
        left: dets.x,
        rotate : gsap.utils.clamp(-20 , 20 , diffrot)
      })
    });  

      chacha.addEventListener("mouseleave", function (dets) {
        gsap.to(".elem img", {
          opacity: 0,
          ease: Power4 ,
          duration: 0.5,
      });
    })
})