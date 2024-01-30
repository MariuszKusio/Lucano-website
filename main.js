// Components from html

const emailButton = document.querySelector('.sendMessage');
let emailButtonFlag = true;   // flag for make button disable after sending message (anti-spam)
let formUserName = document.querySelector('.userNameInput');
let formSubject = document.querySelector('.subjectInput');
let formReplyTo = document.querySelector('.userEmailInput');
let formMessage = document.querySelector('.textMessage');
const validationLabel = document.querySelector('.formValidationLabel');






// Messages

let butonStatus = false;
emailButton.disabled = butonStatus;




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
    validationLabel.textContent = 'Przeładuj stronę żeby wysłać nową wiadomość.';
    let butonStatus = true;
    emailButton.disabled = butonStatus;

}
     
}


emailButton.addEventListener('click', sendEmail);




// Test function

const showMe = () => {
    console.log(butonStatus);
   }
   // setInterval(showMe,1000);