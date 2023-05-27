const alturaEl = document.querySelector("#altura");
const pesoEl = document.querySelector("#peso");
const imcTextEl = document.querySelector(".rightSide_imc");
const imcVariationEl = document.querySelector(".rightSide_var");
const srcImageEl = document.querySelector(".rightSide_img");

const levels = [
  { title: "Magreza", color: "#96A3AB", imc: [0, 18.5] },
  { title: "Normal", color: "#0EAD69", imc: [18.6, 24.9] },
  { title: "Sobrepeso", color: "#E2B039", imc: [25, 30] },
  { title: "Obesidade", color: "#C3423F", imc: [30.1, 999] },
];

document.querySelector("#calcular").addEventListener("click", () => {
  calculateImc(parseFloat(alturaEl.value), parseFloat(pesoEl.value));
});

const invalidBorder = (b) => {
  if (b) {
    pesoEl.classList.add("invalid");
    alturaEl.classList.add("invalid");
  } else {
    pesoEl.classList.remove("invalid");
    alturaEl.classList.remove("invalid");
  }
};

const calculateImc = (altura, peso) => {
  if (isNaN(altura) || isNaN(peso) || peso <= 0 || altura <= 0) {
    invalidBorder(true);
    return null;
  }

  const imcResult = peso / (altura * altura);
  for (const i in levels) {
    if (imcResult >= levels[i].imc[0] && imcResult < levels[i].imc[1]) {
      displayInfo(levels[i], imcResult.toFixed(2));
      invalidBorder(false);
      return levels[i];
    }
  }
  return null;
};

const displayInfo = (array, imc) => {
  imcTextEl.innerHTML = `${array.title.toUpperCase()}`;
  imcTextEl.style.color = array.color;
  if (array.title == levels[1].title) {
    imcVariationEl.innerHTML = `Seu IMC é <span style="color: ${array.color};">${imc}</span>, e está
     dentro do recomendado!`;
  } else {
    imcVariationEl.innerHTML = `Seu IMC é <span style="color: ${array.color};">${imc}</span>, o 
    recomendado é entre <span>${levels[1].imc[0]} e ${levels[1].imc[1]}</span>.`;
  }
  imcTextEl.style.color = array.color;
  srcImageEl.setAttribute("src", `assets/images/${array.title}.png`);
};
