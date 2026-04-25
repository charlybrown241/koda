(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }

    if (scroll > 20) {
      $("header").addClass("header-scrolled");
    } else {
      $("header").removeClass("header-scrolled");
    }
  });


	$('.owl-our-team').owlCarousel({
		items:3,
		loop:true,
		dots: true,
		nav: false,
		autoplay: true,
		margin:0,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  },
			  1600:{
				  items:3
			  }
		  }
	})
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) + 1
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });

      // Reveal on scroll animation
      var revealElements = document.querySelectorAll('.reveal-section');
      if (revealElements.length) {
        var revealObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        revealElements.forEach(function(el) {
          revealObserver.observe(el);
        });
      }

      // Typing effect for hero keyword
      var typingTarget = document.getElementById('typing-word');
      if (typingTarget) {
        var words = ['Web Apps', 'E-commerce', 'Solutions SaaS'];
        var wordIndex = 0;
        var charIndex = 0;
        var deleting = false;

        var typeLoop = function() {
          var currentWord = words[wordIndex];
          var visibleText = deleting
            ? currentWord.slice(0, charIndex - 1)
            : currentWord.slice(0, charIndex + 1);

          typingTarget.textContent = visibleText;
          charIndex = deleting ? charIndex - 1 : charIndex + 1;

          var delay = deleting ? 50 : 90;
          if (!deleting && charIndex === currentWord.length) {
            delay = 1200;
            deleting = true;
          } else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 260;
          }

          window.setTimeout(typeLoop, delay);
        };

        window.setTimeout(typeLoop, 400);
      }

      // Form validation + styled feedback message
      var contactForm = document.querySelector('form#contact');
      if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
          event.preventDefault();

          var firstName = contactForm.querySelector('#name');
          var lastName = contactForm.querySelector('#surname');
          var email = contactForm.querySelector('#email');
          var message = contactForm.querySelector('#message');
          var existingFeedback = contactForm.querySelector('.form-feedback');

          if (existingFeedback) {
            existingFeedback.remove();
          }

          var hasError = false;
          var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
          var messageValid = message.value.trim().length >= 12;

          [firstName, lastName, email, message].forEach(function(field) {
            field.style.border = '1px solid transparent';
          });

          if (!firstName.value.trim()) {
            firstName.style.border = '1px solid #FF4DA6';
            hasError = true;
          }
          if (!lastName.value.trim()) {
            lastName.style.border = '1px solid #FF4DA6';
            hasError = true;
          }
          if (!emailValid) {
            email.style.border = '1px solid #FF4DA6';
            hasError = true;
          }
          if (!messageValid) {
            message.style.border = '1px solid #FF4DA6';
            hasError = true;
          }

          var feedback = document.createElement('div');
          feedback.classList.add('form-feedback');

          if (hasError) {
            feedback.classList.add('error');
            feedback.textContent = 'Veuillez vérifier les champs : email valide et message de 12 caractères minimum.';
          } else {
            feedback.classList.add('success');
            feedback.textContent = 'Merci ! Votre demande a bien été envoyée. L\'équipe Koda vous répond rapidement.';
            contactForm.reset();
          }

          contactForm.appendChild(feedback);
        });
      }
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav ul li a').removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
      });
  }



	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	

	// Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);