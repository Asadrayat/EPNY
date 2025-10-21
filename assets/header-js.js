function applyTransitionDelay() {
  const megaMenuItems = document.querySelectorAll(".mega__menu-item");
  const megaChildItems = document.querySelectorAll(".mega__child > li");

  megaChildItems.forEach((item, index) => {
    const delay = (index / megaChildItems.length) * 0.5;
    item.style.transitionDelay = `${delay}s`;
  });

  megaMenuItems.forEach((item, index) => {
    const delay = 0.5 + (index / megaMenuItems.length) * 0.5;
    item.style.transitionDelay = `${delay}s`;
  });
}

function removeTransitionDelay() {
  const megaMenuItems = document.querySelectorAll(".mega__menu-item");
  const megaChildItems = document.querySelectorAll(".mega__child > li");

  megaMenuItems.forEach((item) => (item.style.transitionDelay = ""));
  megaChildItems.forEach((item) => (item.style.transitionDelay = ""));
}

function setupMegaMenu() {
  document.querySelectorAll(".site__nav-wrapper > li").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const megaMenu = this.querySelector(".mega__menu");
      if (megaMenu) {
        megaMenu.classList.add("open");
        applyTransitionDelay();
      }
    });

    item.addEventListener("mouseleave", function () {
      const megaMenu = this.querySelector(".mega__menu");
      if (megaMenu) {
        megaMenu.classList.remove("open");
        removeTransitionDelay();
      }
    });
  });
}

function setupStickyHeader(
  allowedTemplates,
  templateName,
  suffixName,
  isTransparent,
  isSticky
) {
  const siteHeader = document.querySelector(".site__header");
  if (!siteHeader) return;

  let allowedTemplatesArray = [];
  if (allowedTemplates) {
    const cleanedTemplates = allowedTemplates.replace(/\s/g, "");
    allowedTemplatesArray = cleanedTemplates.split(",");
  }

  if (
    !allowedTemplatesArray.length ||
    (!allowedTemplatesArray.includes(templateName) &&
      !allowedTemplatesArray.includes(suffixName)) ||
    !isTransparent ||
    !isSticky
  ) {
    return;
  }

  const shopifySection = siteHeader.closest(".shopify-section");
  if (!shopifySection) return;

  function updateStickyClass() {
    if (window.innerWidth <= 1249) return;

    if (window.scrollY > 300) {
      shopifySection.classList.remove("no__sticky");
      shopifySection.classList.add("sticky__header");
    } else {
      shopifySection.classList.add("no__sticky");
      shopifySection.classList.remove("sticky__header");
    }
  }

  function updateMargin() {
    if (window.innerWidth <= 1249) return;

    const sectionHeight = shopifySection.offsetHeight;
    const mainContent = document.querySelector("main#MainContent");
    if (mainContent && mainContent.firstElementChild) {
      mainContent.firstElementChild.style.marginTop = `-${sectionHeight}px`;
    }
  }

  updateStickyClass();
  updateMargin();

  window.addEventListener("scroll", updateStickyClass);
  window.addEventListener("resize", () => {
    updateStickyClass();
    updateMargin();
  });
}

function setupFixedHeader(
  allowedTemplates,
  templateName,
  suffixName,
  isTransparent
) {
  const mainHeader = document.querySelector(".site__header");
  if (!mainHeader) return;

  let allowedTemplatesArray = [];
  let not__transparent = false;
  if (allowedTemplates) {
    const cleanedTemplates = allowedTemplates.replace(/\s/g, "");
    allowedTemplatesArray = cleanedTemplates.split(",");
  }

  if (
    !allowedTemplatesArray.length ||
    (!allowedTemplatesArray.includes(templateName) &&
      !allowedTemplatesArray.includes(suffixName)) ||
    !isTransparent
  ) {
    not__transparent = true;
  }

  const headerSection = mainHeader.closest(".shopify-section");
  if (!headerSection) return;

  function adjustFixedPosition() {
    if (window.scrollY > 300) {
      // When scrolling down past 300px, add the fixed__header and animate it in
      headerSection.classList.remove("not__fixed");
      if (not__transparent) {
        headerSection.classList.remove("not__transparent");
      }
      headerSection.classList.add("fixed__header");
    } else {
      // When scrolling up inside 300px, animate it out and remove fixed__header
      headerSection.classList.add("not__fixed");
      if (not__transparent) {
        headerSection.classList.add("not__transparent");
      }
      headerSection.classList.remove("fixed__header");
    }
  }

  adjustFixedPosition();
  window.addEventListener("scroll", adjustFixedPosition);
  window.addEventListener("resize", adjustFixedPosition);
}

function setupStickyMenuScroll() {
  const menuContainers = document.querySelectorAll(".sticky__sm-nav-wrapper");
  if (menuContainers.length === 0) return;

  menuContainers.forEach((wrapper) => {
    const currentLink = wrapper.querySelector("a.active");
    if (currentLink) {
      const positionToScroll =
        currentLink.offsetLeft -
        wrapper.offsetWidth / 2 +
        currentLink.offsetWidth / 2;
      wrapper.scrollTo({
        left: positionToScroll,
        behavior: "smooth",
      });
    }
  });
}

function setupHeaderDrawer() {
  const headerDrawer = document.querySelector(".header__drawer");
  const toggleButton = document.querySelector("[header-drawer-opener]");
  const closeButton = document.querySelector("[header-drawer-close]");
  const html = document.documentElement;
  const body = document.body;
  if (!headerDrawer || !toggleButton || !closeButton) return;

  const toggleDrawer = (event) => {
    event.preventDefault();
    headerDrawer.classList.toggle("active");
    html.classList.toggle(
      "overflow-hidden",
      headerDrawer.classList.contains("active")
    );
    body.classList.toggle(
      "overflow-hidden",
      headerDrawer.classList.contains("active")
    );
  };

  const closeDrawer = () => {
    headerDrawer.classList.remove("active");
    html.classList.remove("overflow-hidden");
    body.classList.remove("overflow-hidden");
  };

  toggleButton.addEventListener("click", toggleDrawer);
  closeButton.addEventListener("click", closeDrawer);

  document.addEventListener("click", (e) => {
    if (
      headerDrawer.classList.contains("active") &&
      !headerDrawer.contains(e.target) &&
      !toggleButton.contains(e.target)
    ) {
      closeDrawer();
    }
  });
}

function setupDrawer() {
  const drawerLogo = document.querySelector(".drawer__logo");
  const drawerMenu = document.querySelector(".drawer-menu");
  const drawerUtensils = document.querySelector(".drawer__utensils");
  const siteHeader = document.querySelector(".site__header");

  if (drawerLogo && drawerMenu && drawerUtensils) {
    const logoHeight = drawerLogo.offsetHeight;
    const utensilsHeight = drawerUtensils.offsetHeight;
    drawerMenu.style.height = `calc(100% - ${logoHeight + utensilsHeight}px)`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.querySelector(".site__header");
  if (siteHeader) {
    const templateName = siteHeader.dataset.template || "";
    const suffixName = siteHeader.dataset.suffix || "";
    const allowedTemplates = siteHeader.dataset.allowed || "";
    const isTransparent = siteHeader.dataset.transparent === "true";
    const isSticky = siteHeader.dataset.sticky === "true";

    setupMegaMenu();
    setupStickyHeader(
      allowedTemplates,
      templateName,
      suffixName,
      isTransparent,
      isSticky
    );
    setupFixedHeader(allowedTemplates, templateName, suffixName, isTransparent);
    setupStickyMenuScroll();
    setupHeaderDrawer();
    setupDrawer();
  }
});
