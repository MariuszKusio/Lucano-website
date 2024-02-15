// Components from html


// Message Component
const emailButton = document.querySelector('.sendMessage');
let emailButtonFlag = true;   // flag for make button disable after sending message (anti-spam)
let formUserName = document.querySelector('.userNameInput');
let formSubject = document.querySelector('.subjectInput');
let formReplyTo = document.querySelector('.userEmailInput');
let formMessage = document.querySelector('.textMessage');
const validationLabel = document.querySelector('.formValidationLabel');

// Gallery Component
const selectAllButton = document.querySelector('.selectAll');
const selectPhotosButton = document.querySelector('.selectPhotos');
const selectVideosButton = document.querySelector('.selectVideos');
// na razie nie wiem czy to potrzebne, ale wybierzemy sobie wszystkie przyciski z daną klasą

const selectButtons = document.querySelectorAll('.filterPick li:nth-child(n+2)');
const videoItems = document.querySelectorAll('.mainGallery video')






// Messages

// this function make message button disabled for 20 seconds and put text in validation label when cooldown will ended
const disabledButton = () => {
   emailButton.disabled = true;
   
   setTimeout(() => {
    validationLabel.textContent = 'Możesz wysłać wiadomość.';
    emailButton.disabled = false;
    emailButtonFlag = true; 
   }, 20000);
}

// main function to send message with secure of spam
const sendEmail = () => {
    (function(){
      emailjs.init("jQrZDq8T5rFR7ZI3A");
    })();
    
    const myEmail = 'mariuszkusio33@gmail.com'; // email to get messages from the contact form

    // parameters for emailJS 
    let params = {
       senderName: formUserName.value,
       subject: formSubject.value,
       to: myEmail,
       replyTo: formReplyTo.value,
       message: formMessage.value,

    };      

    // safeguard for email messages
    if(emailButtonFlag === true){

    if ([...params.senderName].length < 1) {
        validationLabel.textContent = 'Podaj imię';
    } else if ([...params.senderName].length > 15) {
        validationLabel.textContent = 'Za długa nazwa';
    }
    else if ([...params.replyTo].length < 1) {
        validationLabel.textContent = 'Podaj email';
    } else if ([...params.replyTo].length > 60) {
        validationLabel.textContent = 'Za długi email';
    }
    else if ([...params.subject].length < 1) {
        validationLabel.textContent = 'Podaj temat';
    } else if ([...params.subject].length > 80) {
        validationLabel.textContent = 'Za długi temat';
    } 
     else if ([...params.message].length < 1) {
        validationLabel.textContent = 'Napisz wiadomość';
    } else if ([...params.subject].length > 2000) {
        validationLabel.textContent = 'Za długa wiadomość(max 2000 znaków)';
    }
    else {
        let serviceID = "service_f0figcn";
        let templateID = "template_jghr7s1";
    
        emailjs.send("service_f0figcn","template_jghr7s1", params)
        .then( res => {
          validationLabel.textContent = 'Wiadomość została wysłana!';
          // clear form
          formMessage.value = '';
          formReplyTo.value = '';
          formUserName.value = '';
          formSubject.value = '';
          
          emailButtonFlag = false;  
        })
        .catch();
    }

} else if(emailButtonFlag === false) {
    validationLabel.textContent = 'Poczekaj 20 sekund.';

    disabledButton(); 
}
}


emailButton.addEventListener('click', sendEmail);



// Gallery


// Gallery Component
const showAllButton = document.getElementById('showAll');
const showPhotosButton = document.getElementById('showPhotos');
const showVideosButton = document.getElementById('showVideos');

const gallery = document.getElementById('gallery');
const pickButtons = document.getElementById('pickButtons');




showAllButton.addEventListener('click', function() {showItems('all')});
showPhotosButton.addEventListener('click', function() {showItems('photoItem')});
showVideosButton.addEventListener('click', function() {showItems('videoItem')});


// Filter photos and video
function showItems(type) {
    // underline button change when we pick some filter option.
    const buttons = Array.from(pickButtons.children);
    buttons.forEach(button => {
        button.classList.remove('filterSelected');

        if(showAllButton.dataset.btntype == type) {
            showAllButton.classList.add('filterSelected')
        } else if(showPhotosButton.dataset.btntype == type) {
            showPhotosButton.classList.add('filterSelected')
        } else if(showVideosButton.dataset.btntype == type) {
            showVideosButton.classList.add('filterSelected')
        }
    })
    

    // Filter make by Array with gallery items. 
    const items = Array.from(gallery.children);
    items.forEach(item => {
        const isVisible = type === 'all' || item.classList.contains(type);
        item.style.display = isVisible ? 'block' : 'none';
    })

}



// Website main navigation buttons

// Menu buttons
const menuGalleryBtn = document.getElementById('menuGalleryBtn');
const menuAboutBtn = document.getElementById('menuAboutBtn');
const menuContactBtn = document.getElementById('menuContactBtn');


function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior:'smooth' });
  }
}

menuGalleryBtn.addEventListener('click', function() { scrollToSection('gallerySection') });
menuAboutBtn.addEventListener('click', function() { scrollToSection('aboutSection') });
menuContactBtn.addEventListener('click', function() { scrollToSection('contactSection') });