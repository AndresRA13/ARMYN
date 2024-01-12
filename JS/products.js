






function toggleSection(sectionId) {
    const section = document.getElementById(`section${sectionId}`);
    const PRODUCT = document.getElementById('PRODUCT');
    const INFORMATION = document.getElementById('INFORMATION');
    const DISCOUNT = document.getElementById('DISCOUNT');
    const PRODUCTS2 = document.getElementById('PRODUCTS2');
    const IMAGES = document.getElementById('IMAGES');
    const CONTACT = document.getElementById('CONTACT');
    const FOOTER = document.getElementById('Footer');


    if (section.style.display === 'none') {
      section.style.display = 'flex';
      PRODUCT.style.display = 'none';
      INFORMATION.style.display = 'none';
      DISCOUNT.style.display = 'none';
      PRODUCTS2.style.display = 'none';
      IMAGES.style.display = 'none';
      CONTACT.style.display = 'none';
      FOOTER.style.display = 'none';

    } else {
        section.style.display = 'none';
        PRODUCT.style.display = 'flex';
        INFORMATION.style.display = 'flex';
        DISCOUNT.style.display = 'flex';
        PRODUCTS2.style.display = 'flex';
        IMAGES.style.display = 'flex';
        CONTACT.style.display = 'flex';
        FOOTER.style.display = 'flex';
    }
  } 