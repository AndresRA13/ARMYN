


function toggleSection(sectionId) {
    const section = document.getElementById(`section${sectionId}`);
    const PRODUCT = document.getElementById('PRODUCT');
    const DISCOUNT = document.getElementById('DISCOUNT');
    const PRODUCTS2 = document.getElementById('PRODUCTS2');
    const FOOTER = document.getElementById('Footer');


    if (section.style.display === 'none') {
      section.style.display = 'flex';
      PRODUCT.style.display = 'none';
      DISCOUNT.style.display = 'none';
      PRODUCTS2.style.display = 'none';
      FOOTER.style.display = 'none';

    } else {
        section.style.display = 'none';
        PRODUCT.style.display = 'flex';
        DISCOUNT.style.display = 'flex';
        PRODUCTS2.style.display = 'flex';
        FOOTER.style.display = 'flex';
    }
  } 