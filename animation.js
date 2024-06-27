import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

    function animDataSet(){
        // Recorremos todos los elementos que contengan "data-anim"
        const animatedElements = document.querySelectorAll(`[data-anim]`);
        
        // Creamos la función que se encargará de animar los elementos
        animatedElements.forEach((element) => {
            
            //Definimos la variable "delayValue" para obtener los valores del data-attribute `data-anim-delay` 
            let delayValue = element.dataset.animDelay || 0; // Le aplicamos 0 por defecto en caso de que "data-anim-delay" no tenga valor asignado
            
            /* bounceIn */
            
            //  Definimos la animación con gsap para los elementos que contengan el data-attribute `data-anim="bounceIn"`
            if (element.dataset.anim === 'bounceIn') {
                // Inicializamos los elementos con escala 0 y opacidad 0
                gsap.set(element, {
                    scale: 0,
                    opacity: 0,
                });
                // Creamos la animación con gsap
                gsap.to(element, {
                    duration: 1,
                    delay: parseFloat(delayValue), // Con parseFloat convertimos el string a número
                    scale: 1,
                    opacity: 1,
                    ease: "elastic.out(1, 0.3)",
                });
            }

            /* fadeIn */

            //  Definimos la animación con gsap para los elementos que contengan el data-attribute `data-anim="fadeIn"`
            if (element.dataset.anim === 'fadeIn') {
                // Inicializamos los elementos con opacidad 0
                gsap.set(element, {
                    opacity: 0,
                });
                // Creamos la animación con gsap
                gsap.to(element, {
                    duration: 1,
                    delay: parseFloat(delayValue), // Con parseFloat convertimos el string a número
                    opacity: 1,
                    ease: "power2.inOut",
                });
            }
        });
            /* parallax */
            // Creamos la función que se encargará de animar los elementos
            const parallaxElements = document.querySelectorAll(`[data-parallax]`);
            // Recorremos todos los elementos que contengan "data-parallax"
            parallaxElements.forEach((element, index) => {
                const parentElement = parallaxElements[index].parentElement;
                // Definimos la variable "parallaxValue" para obtener los valores del data-attribute `data-parallax` 
                let parallaxValue = (element.dataset.parallaxAceleration * element.dataset.parallaxAceleration) * 5 || 0; // Le aplicamos 0 por defecto en caso de que "data-parallax" no tenga valor asignado
                // Creamos la animación con gsap
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom top",
                        scrub: 5,
                    },
                    y: parallaxValue,
                });
            });

            /* inview bounceIn*/
            function inViewAnim(){
            // observamos si los elementos están en la vista con intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            duration: 1,
                            scale: 1,
                            opacity: 1,
                            delay: parseFloat(entry.target.dataset.animDelay) || 0,
                            ease: "elastic.out(1, 0.3)",
                        });
                    }
                });
            });

            // Definimos la variable "isInView" para obtener los valores del data-attribute `data-anim-inview`
            const isInViewElements = document.querySelectorAll(`[data-anim-inview]`);

            // Inicializamos los elementos con escala 0 y opacidad 0
            isInViewElements.forEach((element) => {
                observer.observe(element);
                gsap.set(element, {
                    scale: 0,
                    opacity: 0,
                });
            });
        }
        inViewAnim();
    }
    animDataSet();


