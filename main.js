import MouseFollower from "mouse-follower"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Splide from '@splidejs/splide'
import './animation.js'

// Función del cursor personalizado 
function customMouse (){
  MouseFollower.registerGSAP(gsap);
  const cursor = new MouseFollower({
    container: document.body,
    className: 'mf-cursor',
    innerClassName: 'mf-cursor-inner',
    textClassName: 'mf-cursor-text',
    hiddenState: '-hidden',
    textState: '-text',
    stateDetection: {
      '-pointer': 'a[cursor-link=true],button, .Header-menuButton, .Header-langSel',
      '-product': '.Catalog-itemImage, .Catalog-itemTitle',
      '-overdive':'.splide'
    },
    speed: .55,
    skewing: 2,
    skewingText: 2,
    stickDelta: .25,
  });2
  const cursorLink = document.querySelectorAll('a[cursor-link=true],button, .Header-menuButton, .Header-langSel');
  const productImage = document.querySelectorAll('.Catalog-itemImage');
  const productTitle = document.querySelectorAll('.Catalog-itemTitle');
  const productHover = [...productImage, ...productTitle, ...cursorLink];
  productHover.forEach((el)=>{
    el.addEventListener('mouseenter',()=>{
      cursor.setText('ver');
    });
    el.addEventListener('mouseleave',()=>{
      cursor.setText('');
    });
  });

  const el = document.querySelector('#image-carousel');
  if(el) {
      el.addEventListener('mouseenter', () => {
        cursor.setText('desliza');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.setText('');
    });
  }

}
customMouse();

// Carousel de productos 

const imageCarousel = document.querySelector('#image-carousel');

if (imageCarousel) {
 
let splide = new Splide( imageCarousel, {
  type   : 'loop',
  autoHeight: true,
  drag   : 'free',
  snap   : true,
  arrows : false,
  pagination: false,
  perPage: 4,
  breakpoints: {
    767: {
      perPage: 1,
      drag   : 'true',
    },
    1024: {
      perPage: 2,
    },
  },
} );

splide.mount();
}


// Toggle y animaciones del menu
const menuButton = document.querySelector('.Header-menuButton');
const menu = document.querySelector('.Menu');
const header = document.querySelector('.Header');
const menuClose = menu.querySelector('.Menu-closeButton');
const { body, documentElement: html } = document;
const menuElements = gsap.utils.toArray('.Menu-element');

const toggleNoScroll = () => [body, html].forEach(el => el.classList.toggle('noScroll'));

const animateMenuElements = (show) => {

  const opacity = show ? 1 : 0;
  const y = show ? 0 : 20;
  const stagger = show ? 0.05 : -0.05;

  gsap.set(menuElements, {
    opacity: show ? 0 : 1,
    y: show ? 20 : 0
  });

  gsap.to(menuElements, {
    duration: 0.5,
    delay: show ? 1 : 0,
    opacity,
    y,
    stagger,
    ease: show ? 'power2.in' : 'power2.in',
    onComplete: () => {
      if (!show) {
        header.classList.remove('Header--menuOpen');
        menu.classList.remove('Menu--open');
      }
    }
  });
};

const openMenu = () => {
  toggleNoScroll();
  animateMenuElements(true);
  header.classList.add('Header--menuOpen');
  menu.classList.add('Menu--open');
};

const closeMenu = () => {
  animateMenuElements(false);
  toggleNoScroll();
};

menuButton.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);


const menuCategoryTitle = document.querySelectorAll('.MegaMenu-decoration');

menuCategoryTitle.forEach((el) => {
  const titleValue = el.textContent;
  console.log(titleValue);
  el.setAttribute('data-content', titleValue);
});



