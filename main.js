// Components from html

const emailButton = document.querySelector('.sendMessage');


// var paramss = {
//     senderName: document.querySelector('.userNameInput').value,
//     subject: document.querySelector('.subjectInput').value,
//     replyTo: document.querySelector('.userEmailInput').value,
//     message: document.querySelector('.textMessage').value,

//  };


// Messages

const sendEmail = () => {
    (function(){
      emailjs.init("jQrZDq8T5rFR7ZI3A");
    })();
    
    const myEmail = 'mariuszkusio33@gmail.com'; // email to get messages from the contact form

    let params = {
       senderName: document.querySelector('.userNameInput').value,
       subject: document.querySelector('.subjectInput').value,
       to: myEmail,
       replyTo: document.querySelector('.userEmailInput').value,
       message: document.querySelector('.textMessage').value,

    };      

    
    // safeguard for email messages
    if ([...params.senderName].length < 1) {
        alert('Podaj imię.');
    } else if ([...params.senderName].length > 15) {
        alert('Za długa nazwa');
    }
     else if ([...params.subject].length < 1) {
        alert('Podaj temat.');
    } else if ([...params.subject].length > 80) {
        alert('Za długi temat');
    }
    else if ([...params.replyTo].length < 1) {
        alert('Podaj email.');
    } else if ([...params.replyTo].length > 60) {
        alert('Za długi email.');
    } 
     else if ([...params.message].length < 1) {
        alert('Napisz wiadomość.');
    } else if ([...params.subject].length > 2000) {
        alert('Za długa wiadomość.');
    }
    else {
        let serviceID = "service_f0figcn";
        let templateID = "template_jghr7s1";
    
        emailjs.send("service_f0figcn","template_jghr7s1", params)
        .then( res => {
          alert('Email został wysłany poprawnie!');
        })
        .catch();
    }
     
    // var serviceID = "service_f0figcn";
    // var templateID = "template_jghr7s1";

    // emailjs.send("service_f0figcn","template_jghr7s1", params)
    // .then( res => {
    //   alert('Email został wysłany poprawnie!');
    // })
    // .catch();
}

emailButton.addEventListener('click', sendEmail);
