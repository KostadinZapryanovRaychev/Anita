document.addEventListener("DOMContentLoaded", () => {
  checkAndAddOfferButtons();
  bindPopupCloseButton();
  setupFormSubmissionListener();
});

document.addEventListener("qodef-on-content-loaded", checkAndAddOfferButtons);

// ========== INIT FUNCTIONS ==========

function checkAndAddOfferButtons() {
  const intervalId = setInterval(() => {
    const section = document.querySelector("#carmen-home-page-row-one");
    if (section) {
      addOfferButtons(section);
      clearInterval(intervalId);
    }
  }, 500);
}

function bindPopupCloseButton() {
  const closePopup = document.getElementById("close-popup");
  if (closePopup) {
    closePopup.addEventListener("click", closePopupForm);
  }
}

function setupFormSubmissionListener() {
  document.addEventListener("wpcf7mailsent", function () {
    showThankYouMessage();
    setTimeout(() => {
      closePopupForm();
    }, 4000); // Delay to allow message to be seen
  });
}

// ========== OFFER BUTTON SETUP ==========

function addOfferButtons(section) {
  const items = section.querySelectorAll(".qode_carousels .slides > li");
  items.forEach((item) => {
    if (!item.querySelector(".custom-offer-button-wrapper")) {
      const button = createOfferButton(item);
      const wrapper = createButtonWrapper(button);
      item.appendChild(wrapper);
    }
  });

  hideContactFormOnLoad();
}

function createOfferButton(item) {
  const button = document.createElement("button");
  button.className = "custom-offer-button";
  button.textContent = "Take Offer";

  styleOfferButton(button);
  attachHoverEffects(button);

  button.addEventListener("click", () => handleOfferClick(item));

  return button;
}

function createButtonWrapper(button) {
  const wrapper = document.createElement("div");
  wrapper.className = "custom-offer-button-wrapper";
  wrapper.style.cssText = `
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  `;
  wrapper.appendChild(button);
  return wrapper;
}

function styleOfferButton(button) {
  button.style.cssText += `
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  `;
}

function attachHoverEffects(button) {
  button.addEventListener("mouseenter", () => {
    button.style.background = "rgba(255, 255, 255, 0.9)";
    button.style.color = "#000";
  });
  button.addEventListener("mouseleave", () => {
    button.style.background = "rgba(0, 0, 0, 0.6)";
    button.style.color = "#fff";
  });
}

// ========== CLICK HANDLER ==========

function handleOfferClick(item) {
  try {
    const imgSrc = getItemImageSrc(item);
    showPopupForm();
    insertFormIntoPopup();
    showFormWrapper();
    prefillFormWithProduct(imgSrc);
    console.log("Opened popup with image src:", imgSrc);
  } catch (error) {
    console.error("Error handling offer click:", error);
  }
}

// ========== POPUP FORM CONTROL ==========

function getItemImageSrc(item) {
  const img = item.querySelector("img");
  return img ? img.src : "N/A";
}

function showPopupForm() {
  const popup = document.getElementById("quote-popup");
  if (popup) popup.style.display = "flex";
}

function insertFormIntoPopup() {
  try {
    const form = document.querySelector(".wpcf7");
    const container = document.getElementById("quote-form-container");
    if (form && container && !container.contains(form)) {
      container.appendChild(form);
    }
  } catch (error) {
    console.error("Failed to insert form into popup:", error);
  }
}

function showFormWrapper() {
  const wrapper = document.querySelector("#carmen-home-page-row-four");
  if (wrapper) wrapper.style.display = "flex";
}

function prefillFormWithProduct(imgSrc) {
  setTimeout(() => {
    try {
      const hiddenInput =
        document.querySelector("#product-url") ||
        document.querySelector("#product-title");
      if (hiddenInput) hiddenInput.value = imgSrc;

      const form = document.querySelector(".wpcf7");
      const textarea = form?.querySelector("textarea");
      if (textarea) {
        const machineName = getFormattedNameFromURL(imgSrc);
        textarea.value = `Запитване относно ${machineName}\n\n`;
      }
    } catch (e) {
      console.error("Prefill error:", e);
    }
  }, 100);
}

function hideContactFormOnLoad() {
  const wrapper = document.querySelector("#carmen-home-page-row-four");
  if (wrapper) wrapper.style.display = "none";
}

function closePopupForm() {
  const popup = document.getElementById("quote-popup");
  if (popup) {
    setTimeout(() => {
      popup.style.display = "none";
    }, 5000);
  }
}

// ========== UTILS ==========

function getFormattedNameFromURL(url) {
  try {
    const filename = url.substring(url.lastIndexOf("/") + 1);
    const namePart = filename.split(".")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  } catch (e) {
    console.log("Error in getFormattedNameFromURL", e);
    return "продукта";
  }
}

// ========== THANK YOU MESSAGE ==========

function showThankYouMessage() {
  setTimeout(() => {
    // message?.style?.display = "none";
    window.location.reload();
  }, 3000);
}
