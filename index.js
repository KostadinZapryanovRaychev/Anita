document.addEventListener("DOMContentLoaded", () => {
  checkAndAddOfferButtons();
  bindPopupCloseButton();
  setupFormSubmissionListener();
  styleClosePopupButton();
});

document.addEventListener("qodef-on-content-loaded", checkAndAddOfferButtons);

const observer = new MutationObserver(() => {
  try {
    const section = document.querySelector("#carmen-home-page-row-one");
    if (section && !section.querySelector(".custom-offer-button-wrapper")) {
      addOfferButtons(section);
    }
  } catch (e) {
    console.error("Error in MutationObserver:", e);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// ========== INIT FUNCTIONS ==========

function styleClosePopupButton() {
  try {
    const closeBtn = document.getElementById("close-popup");
    if (closeBtn) {
      closeBtn.style.cssText += `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.8);
        color: #333;
        border: none;
        font-size: 20px;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        transition: background 0.3s ease, transform 0.2s ease;
      `;
      closeBtn.addEventListener("mouseenter", () => {
        closeBtn.style.background = "rgba(255, 50, 50, 0.9)";
        closeBtn.style.color = "#fff";
        closeBtn.style.transform = "scale(1.1)";
      });
      closeBtn.addEventListener("mouseleave", () => {
        closeBtn.style.background = "rgba(255, 255, 255, 0.8)";
        closeBtn.style.color = "#333";
        closeBtn.style.transform = "scale(1)";
      });
    }
  } catch (e) {
    console.error("Error in styleClosePopupButton:", e);
  }
}

function checkAndAddOfferButtons() {
  try {
    const intervalId = setInterval(() => {
      const section = document.querySelector("#carmen-home-page-row-one");
      if (section) {
        addOfferButtons(section);
        clearInterval(intervalId);
      }
    }, 500);
  } catch (e) {
    console.error("Error in checkAndAddOfferButtons:", e);
  }
}

function bindPopupCloseButton() {
  try {
    const closePopup = document.getElementById("close-popup");
    if (closePopup) {
      console.log("clicked");
      closePopup.addEventListener("click", closePopupForm);
    }
  } catch (e) {
    console.error("Error in bindPopupCloseButton:", e);
  }
}

function setupFormSubmissionListener() {
  try {
    document.addEventListener("wpcf7mailsent", function () {
      showThankYouMessage();
      setTimeout(() => {
        closePopupForm();
      }, 4000);
    });
    document.addEventListener("wpcf7mailfailed", function () {
      showErrorMessage();
      setTimeout(() => {
        closePopupForm();
      }, 4000);
    });
  } catch (e) {
    console.error("Error setting up form submission listener:", e);
    showErrorMessage();
    setTimeout(() => {
      closePopupForm();
    }, 4000);
  }
}

// ========== OFFER BUTTON SETUP ==========

function addOfferButtons(section) {
  try {
    const items = section.querySelectorAll(".qode_carousels .slides > li");
    items.forEach((item) => {
      if (!item.querySelector(".custom-offer-button-wrapper")) {
        const button = createOfferButton(item);
        const wrapper = createButtonWrapper(button);
        item.appendChild(wrapper);
      }
    });

    hideContactFormOnLoad();
  } catch (e) {
    console.error("Error in addOfferButtons:", e);
  }
}

function createOfferButton(item) {
  try {
    const button = document.createElement("button");
    button.className = "custom-offer-button";
    button.textContent = "Take Offer";
    styleOfferButton(button);
    attachHoverEffects(button);
    button.addEventListener("click", () => handleOfferClick(item));
    return button;
  } catch (e) {
    console.error("Error in createOfferButton:", e);
  }
}

function createButtonWrapper(button) {
  try {
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
  } catch (e) {
    console.error("Error in createButtonWrapper:", e);
  }
}

function styleOfferButton(button) {
  try {
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
  } catch (e) {
    console.error("Error in styleOfferButton:", e);
  }
}

function attachHoverEffects(button) {
  try {
    button.addEventListener("mouseenter", () => {
      button.style.background = "rgba(255, 255, 255, 0.9)";
      button.style.color = "#000";
    });
    button.addEventListener("mouseleave", () => {
      button.style.background = "rgba(0, 0, 0, 0.6)";
      button.style.color = "#fff";
    });
  } catch (e) {
    console.error("Error in attachHoverEffects:", e);
  }
}

function handleOfferClick(item) {
  try {
    const imgSrc = getItemImageSrc(item);
    showPopupForm();
    insertFormIntoPopup();
    showFormWrapper();
    prefillFormWithProduct(imgSrc);
    // console.log("Opened popup with image src:", imgSrc);
  } catch (error) {
    console.error("Error handling offer click:", error);
  }
}

function getItemImageSrc(item) {
  try {
    const img = item.querySelector("img");
    return img ? img.src : "N/A";
  } catch (e) {
    console.error("Error in getItemImageSrc:", e);
  }
}

function showPopupForm() {
  try {
    const popup = document.getElementById("quote-popup");
    if (popup) popup.style.display = "flex";
  } catch (e) {
    console.error("Error in showPopupForm:", e);
  }
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
  try {
    const wrapper = document.querySelector("#carmen-home-page-row-four");
    if (wrapper) wrapper.style.display = "flex";
  } catch (e) {
    console.error("Error in showFormWrapper:", e);
  }
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
  try {
    const wrapper = document.querySelector("#carmen-home-page-row-four");
    if (wrapper) wrapper.style.display = "none";
  } catch (e) {
    console.error("Error in hideContactFormOnLoad:", e);
  }
}

function closePopupForm() {
  try {
    const popup = document.getElementById("quote-popup");
    if (popup) {
      setTimeout(() => {
        popup.style.display = "none";
      }, 5000);
    }
  } catch (e) {
    console.error("Error in closePopupForm:", e);
  }
}

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

function showThankYouMessage() {
  try {
    const message = document.createElement("div");
    message.textContent = "Thank you for your submission!";
    message.style.cssText = `
      position: fixed;
      top: 600px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 16px;
      z-index: 9999;
      display: block;
    `;

    document.body.appendChild(message);
    setTimeout(() => {
      message.style.display = "none";
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 3000);
  } catch (e) {
    console.error("Error in showThankYouMessage:", e);
  }
}

function showErrorMessage() {
  try {
    const message = document.createElement("div");
    message.textContent = "An error occurred. Please try again.";
    message.style.cssText = `
      position: fixed;
      top: 600px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #f44336;
      color: white;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 16px;
      z-index: 9999;
      display: block;
    `;

    document.body.appendChild(message);
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  } catch (e) {
    console.error("Error in showErrorMessage:", e);
  }
}
