document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const indicators = document.querySelectorAll(".indicator");
  let selectedProduct = { title: "", price: "" };
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
    currentStep = index;
  }

  document.querySelectorAll(".select-product").forEach((button) => {
    button.addEventListener("click", () => {
      selectedProduct.title = button.getAttribute("data-product");
      selectedProduct.price = button
        .closest(".product-card")
        .querySelector(".price").textContent;

      document.getElementById(
        "selected-product-title"
      ).innerText = `Produto Selecionado: ${selectedProduct.title}`;
      document.getElementById(
        "selected-product-description"
      ).innerText = `Descrição breve do ${selectedProduct.title}. Um produto de alta qualidade com excelentes características.`;
      document.getElementById(
        "selected-product-price"
      ).innerText = ` Preço: ${selectedProduct.price}`;

      showStep(1);
    });
  });

  document.getElementById("next-to-step-3").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numeroCasa = document.getElementById("numero-casa").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const errorMessage = document.getElementById("form-error");

    if (!nome || !numero || !cidade || !rua || !numeroCasa || !bairro) {
      errorMessage.innerText =
        "* Por favor, preencha todos os campos obrigatórios.";
      errorMessage.style.display = "block";
      return;
    }

    errorMessage.style.display = "none";

    document.getElementById("summary-nome").innerText = nome;
    document.getElementById("summary-numero").innerText = numero;
    document.getElementById("summary-cidade").innerText = cidade;
    document.getElementById("summary-rua").innerText = rua;
    document.getElementById("summary-numero-casa").innerText = numeroCasa;
    document.getElementById("summary-bairro").innerText = bairro;

    showStep(2);
  });

  document.getElementById("show-summary").addEventListener("click", () => {
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    );
    if (paymentMethod) {
      document.getElementById("summary-payment-method").innerText =
        paymentMethod.nextElementSibling.textContent;
      const priceText = selectedProduct.price
        .replace("R$", "")
        .replace(",", ".")
        .trim();
      const price = parseFloat(priceText);
      const total = price;
      document.getElementById(
        "selected-product-price"
      ).innerText = `Preço: R$ ${total.toFixed(2)}`;
      showStep(3);
    } else {
      alert("Selecione uma forma de pagamento.");
    }
  });

  document.getElementById("confirm-order").addEventListener("click", () => {
    const produto = document
      .getElementById("selected-product-title")
      .innerText.replace("Produto Selecionado: ", "");
    const nome = document.getElementById("summary-nome").innerText;
    const numero = document.getElementById("summary-numero").innerText;
    const cidade = document.getElementById("summary-cidade").innerText;
    const rua = document.getElementById("summary-rua").innerText;
    const numeroCasa = document.getElementById("summary-numero-casa").innerText;
    const bairro = document.getElementById("summary-bairro").innerText;
    const pagamento = document.getElementById(
      "summary-payment-method"
    ).innerText;

    const whatsappMessage =
      `Olá! Gostaria de fazer o seguinte pedido:\n\n` +
      `*Produto:* ${produto}\n` +
      `*Nome:* ${nome}\n` +
      `*Telefone:* ${numero}\n` +
      `*Endereço:* Rua ${rua}, Nº ${numeroCasa}, Bairro ${bairro}, Cidade ${cidade}\n` +
      `*Forma de Pagamento:* ${pagamento}\n` +
      `*Preço:* ${selectedProduct.price}`;

    const whatsappLink = `https://wa.me/55991174726?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.location.href = whatsappLink;
  });

  document.querySelectorAll(".back-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  showStep(0);
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    this.reset();

    this.submit();
  });

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const icons = document.querySelector(".icons");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  icons.classList.toggle("active");
});
