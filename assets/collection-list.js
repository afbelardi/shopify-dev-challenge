class CollectionTabs extends HTMLElement {
    constructor() {
      super();
     
      document.addEventListener("DOMContentLoaded", function(event) {
        const desktopTabs = this.querySelectorAll('.tabs-desktop li');
        const firstTab = desktopTabs[0];
        firstTab.classList.add('active');
        const firstCollectionTab = document.querySelector("[data-collection-url]");
        const firstCollectionUrl = firstCollectionTab.dataset.collectionUrl;
      
        // Fetch and render the first collection
        fetchSection(firstCollectionUrl);

        const firstTitle = firstTab.querySelector('.collection_titles');
        firstTitle.classList.add('active');

        desktopTabs.forEach((tab) => {
          tab.addEventListener('click', () => {
            const currentActiveTab = this.querySelector('.tabs-desktop li.active');
            if (currentActiveTab) {
              currentActiveTab.classList.remove('active');
  
              const currentActiveTitle = currentActiveTab.querySelector('.collection_titles');
              if (currentActiveTitle) {
                currentActiveTitle.classList.remove('active');
              }
            }
  
            tab.classList.add('active');
            const clickedTitle = tab.querySelector('.collection_titles');
            if (clickedTitle) {
              clickedTitle.classList.add('active');
            }
  
          })
        })
      })


      

      this.querySelectorAll("[data-collection-url]").forEach( tab => { 
        tab.addEventListener('click', (e) => { 
         fetchSection(tab.dataset.collectionUrl);
        }) 
      })

     async function fetchSection (collectionUrl) {
        const response = await fetch(collectionUrl + "/?sections=retrieved-section");
  
        const data = await response.text();
        const sections = JSON.parse(data);
        console.log(sections);
        const thisDocument = new DOMParser().parseFromString(sections['retrieved-section'], 'text/html');
        console.log(thisDocument);
        const pageWidthContent = thisDocument.querySelector('.shopify-section').innerHTML;
        const targetElement = document.querySelector('[data-section-id="retrieved-section"]');
        targetElement.innerHTML = pageWidthContent;
      
      }
     
    }


    
    }     
    
    
  
    
 
  
  customElements.define('collection-tabs', CollectionTabs);

























  // function fetchProductsFromCollection(collectionTitle) {
  //   console.log('worked');
  //   return fetch(`/collections/${collectionTitle}`);
  // }

 

  // function fetchProductsAndRenderToSection(collectionUrl, sectionId) {
  //   console.log(sectionId);
  //   const sectionId = 'shopify-section-collection-products';
  //   const url = `${collectionUrl}?sections=${sectionId}`;

  // return fetch(url)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response error');
  //     }
  //     return response.text();
  //   })
  //   .then((htmlContent) => {
  //     const sectionContainer = document.getElementById(sectionId);
  //     if (sectionContainer) {
  //       sectionContainer.innerHTML = htmlContent;
  //     }


  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

    // fetchProductsFromCollection(collectionTitle)
            //   .then((response) => response.text())
            //   .then((htmlContent) => {
            //     const parser = new DOMParser();
            //     const doc = parser.parseFromString(htmlContent, 'text/html');
            //     const products = doc.querySelectorAll('.card');
            //     console.log(products);
            //   })
            //   .catch((error) => {
            //     console.error(error)
            //   })

          