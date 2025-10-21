document.addEventListener("DOMContentLoaded", function () {
  const sortOpener = document.querySelector("[sort-opener]");
  const sortBody = document.querySelector("[sort-body]");
  const sortClose = document.querySelector("[sort-close]");
  const body = document.body;
  function openSortBody() {
    sortBody.classList.add("open");
    body.classList.add("overflow-hidden");
  }

  function closeSortBody() {
    sortBody.classList.remove("open");
    body.classList.remove("overflow-hidden");
  }

  sortOpener.addEventListener("click", function (event) {
    event.stopPropagation();
    if (sortBody.classList.contains("open")) {
      closeSortBody();
    } else {
      openSortBody();
    }
  });

  sortClose.addEventListener("click", function (event) {
    event.stopPropagation();
    closeSortBody();
  });

  document.addEventListener("click", function (event) {
    if (
      !sortBody.contains(event.target) &&
      sortBody.classList.contains("open")
    ) {
      closeSortBody();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterPopup = document.querySelector(".filter__popup");
  const filterPopupWrapper = document.querySelector(".filter__popup-wrapper");
  const filterOpeners = document.querySelectorAll("[filter-opener]");
  const filterPopupClose = document.querySelector("[filter-popup-close]");
  const body = document.body;
  function openFilterPopup() {
    filterPopup.classList.add("open");
    body.classList.add("overflow-hidden");
  }

  function closeFilterPopup() {
    filterPopup.classList.remove("open");
    body.classList.remove("overflow-hidden");
  }

  filterOpeners.forEach((opener) => {
    opener.addEventListener("click", openFilterPopup);
  });

  if (filterPopupClose) {
    filterPopupClose.addEventListener("click", closeFilterPopup);
  }

  document.addEventListener("click", function (event) {
    if (
      !filterPopupWrapper.contains(event.target) &&
      !event.target.hasAttribute("filter-opener")
    ) {
      closeFilterPopup();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {});

/*
document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders1 = document.querySelectorAll(".accordion-header");
  const accordionBodies1 = document.querySelectorAll(".accordion-body");
  const accordionIcons1 = document.querySelectorAll(".accordion-header-icon");

  function initializeAccordion() {
    accordionBodies1.forEach((body, index) => {
      if (index !== 0) {
        body.classList.add("hidden");
      }
    });

    if (accordionIcons1[0]) {
      accordionIcons1[0].classList.add("rotate");
    }

    accordionHeaders1.forEach((header, index) => {
      header.addEventListener("click", function () {
        const accordionBody = accordionBodies1[index];
        const accordionIcon = accordionIcons1[index];

        accordionBody.classList.toggle("hidden");
        accordionIcon.classList.toggle("rotate");
      });
    });
  }

  initializeAccordion();

  window.addEventListener("resize", initializeAccordion);
});
*/
/*
document.addEventListener("DOMContentLoaded", () => {
  const collectionsLists = document.querySelectorAll(".collections__list");

  if (collectionsLists.length > 0) {
    collectionsLists.forEach((container) => {
      const activeLink = container.querySelector("a.active");

      if (activeLink) {
        const scrollPosition =
          activeLink.offsetLeft -
          container.offsetWidth / 2 +
          activeLink.offsetWidth / 2;

        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const collectionsList = document.querySelector(".collections__list");

  if (!collectionsList) return;

  const initialOffsetTop = collectionsList.offsetTop;
  let isSticky = false;

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= initialOffsetTop && !isSticky) {
      collectionsList.classList.add("sticky__nav");
      isSticky = true;
    } else if (scrollPosition < initialOffsetTop && isSticky) {
      collectionsList.classList.remove("sticky__nav");
      isSticky = false;
    }
  });
});
*/
