document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".btn-contato .btn");
  if (button) {
    button.addEventListener("click", function () {
      var contatoSection = document.getElementById("contato");
      if (contatoSection) {
        contatoSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  emailjs.init("lwwvbYE4MJ_Kz0Kg8");

  const form = document.getElementById("contact-form");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const assunto = document.getElementById("assunto");
  const mensagem = document.getElementById("mensagem");
  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.innerHTML = "";
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((el) => el.remove());

    let valid = true;

    if (nome.value.trim() === "") {
      showError(nome, "Por favor, preencha seu nome.");
      valid = false;
    }

    if (email.value.trim() === "") {
      showError(email, "Por favor, preencha seu e-mail.");
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError(email, "Por favor, insira um e-mail válido.");
      valid = false;
    }

    if (assunto.value.trim() === "") {
      showError(assunto, "Por favor, preencha o assunto.");
      valid = false;
    }

    if (mensagem.value.trim() === "") {
      showError(mensagem, "Por favor, escreva sua mensagem.");
      valid = false;
    }

    if (valid) {
      const templateParams = {
        user_name: nome.value,
        user_email: email.value,
        subject: assunto.value,
        message: mensagem.value,
      };

      emailjs.send("service_qkteuz5", "template_f1mhewn", templateParams).then(
        function (response) {
          formMessage.style.color = "green";
          formMessage.innerText = "Mensagem enviada com sucesso!";
          form.reset();
        },
        function (error) {
          formMessage.style.color = "red";
          formMessage.innerText =
            "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.";
        }
      );
    }
  });

  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.innerText = message;
    input.parentElement.appendChild(errorElement);
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(email.toLowerCase());
  }
});
