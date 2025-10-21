class ProductInformation extends HTMLElement {
  constructor() {
    super();
    this.initThumbSlider();
    this.handleEvents();
  }

  connectedCallback() {
    this.querySelector("pinfo-variant-picker").addEventListener(
      "input",
      this.handleVariantInput.bind(this)
    );
  }

  handleEvents() {
    this.querySelector("form").addEventListener(
      "submit",
      this.handleAddToCart.bind(this)
    );
  }

  handleAddToCart(e) {
    e.preventDefault();
    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    let btn = this.querySelector('button[type="submit"]');
    if (btn) {
      btn.classList.add("loading");
      btn.textContent = "Adding To Cart ...";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".7";
    }
    let addToCartForm = this.querySelector('form[action$="/cart/add"]');
    let formData = new FormData(addToCartForm);

    if (this.cart) {
      formData.append(
        "sections",
        this.cart.getSectionsToRender().map((section) => section.id)
      );
      formData.append("sections_url", window.location.pathname);
      this.cart.setActiveElement(document.activeElement);
    }

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.cart.renderContents(response);
      })
      .finally(() => {
        if (btn) {
          btn.classList.remove("loading");
          btn.textContent = "Add To Cart";
          btn.style.pointerEvents = "unset";
          btn.style.opacity = "1";
        }
        if (this.cart && this.cart.classList.contains("is-empty"))
          this.cart.classList.remove("is-empty");
      });
  }

  handleVariantInput(e) {
    const { variantUrl, imageId } = e.target?.dataset;

    this.querySelector("pinfo-variant-picker").style.pointerEvents = "none";
    this.querySelector("pinfo-variant-picker").style.opacity = ".6";
    this.handleOptins(variantUrl, imageId);
  }

  handleOptins(url = null, imageId = null) {
    if (imageId && imageId !== null) this.handleActiveSlide(imageId);
    if (url && url !== null) this.handleOptions(url);
  }

  handleOptions(url) {
    if (!url || url === null) return;

    this.updateURL(url);
    this.render(url);
  }

  updateURL(url) {
    if (this.dataset.updateUrl === "false") return null;
    window.history.pushState({}, "", url);
  }

  async render(url) {
    const response = await fetch(url);
    const data = await response.text();
    const html = new DOMParser().parseFromString(data, "text/html");

    if (this.querySelector("pinfo-variant-picker")) {
      this.querySelector("pinfo-variant-picker").innerHTML = html.querySelector(
        "pinfo-variant-picker"
      ).innerHTML;
    }

    if (this.querySelector(".pinfo-form-wrapper")) {
      this.querySelector(".pinfo-form-wrapper").innerHTML = html.querySelector(
        ".pinfo-form-wrapper"
      ).innerHTML;
      if (window.Shopify && Shopify.PaymentButton) {
        Shopify.PaymentButton.init();
      }
    }

    this.handleEvents();
    this.querySelector("pinfo-variant-picker").style.pointerEvents = "inherit";
    this.querySelector("pinfo-variant-picker").style.opacity = "1";
    window.sizeGuide();
  }

  handleActiveSlide(imageId) {
    if (!imageId || imageId === null) return;
    this.slides = this.querySelectorAll(".pinfo-thumb-swiper .swiper-slide");
    if (this.slides) {
      this.slides.forEach((slide, index) => {
        if (slide.dataset?.imageId === imageId) {
          const activeIndex = index + 1;
          this.gotoActiveSlide(activeIndex);
        }
      });
    }
  }

  gotoActiveSlide(index = 0) {
    if (index && this.thumbSwiper) this.thumbSwiper.slideTo(index);
  }

  initThumbSlider() {
    this.thumbSwiperConfig = {};
    if (screen.width > 768) {
      this.thumbSwiperConfig = {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        effect: "card",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: false,
        },
      };
    } else {
      this.thumbSwiperConfig = {
        slidesPerView: 1.2,
        spaceBetween: 2,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      };
    }

    this.slides = this.querySelectorAll(".pinfo-thumb-swiper .swiper-slide");
    if (this.slides && this.slides.length > 10) {
      this.thumbSwiperConfig.pagination.dynamicBullets = false;
    }

    this.thumbSwiper = new Swiper(
      this.querySelector(".pinfo-thumb-swiper"),
      this.thumbSwiperConfig
    );

    if (this.dataset.selectedImageId) {
      this.handleActiveSlide(this.dataset.selectedImageId);
    }
  }
}

class ProductQuickAdd extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("input", this.handleVariantInput.bind(this));
    this.addEventListener("click", this.handleSubmitEvemt.bind(this));
  }

  handleVariantInput(e) {
    const { value } = e.target;
    console.log("valjue", value);
    if (document.querySelector("product-information"))
      document.querySelector("product-information").handleOptions(value);
  }

  handleSubmitEvemt(e) {
    if (e.target.closest("form")) {
      e.preventDefault();
    }

    if (e.target.tagName === "BUTTON") {
      this.handleAddToCart(e.target.closest("form"), e.target);
    }
  }

  handleAddToCart(form, btn) {
    if (!form) return;

    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    if (btn) {
      btn.classList.add("loading");
      btn.textContent = "Adding To Cart ...";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".7";
    }

    let formData = new FormData(form);

    if (this.cart) {
      formData.append(
        "sections",
        this.cart.getSectionsToRender().map((section) => section.id)
      );
      formData.append("sections_url", window.location.pathname);
      this.cart.setActiveElement(document.activeElement);
    }

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("response", response)
        this.cart.renderContents(response);
      })
      .finally(() => {
        if (btn) {
          btn.classList.remove("loading");
          btn.textContent = "Add To Cart";
          btn.style.pointerEvents = "unset";
          btn.style.opacity = "1";
        }
        if (this.cart && this.cart.classList.contains("is-empty"))
          this.cart.classList.remove("is-empty");
      });
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  customElements.define("product-information", ProductInformation);
  customElements.define("pqa-new", ProductQuickAdd);
});
