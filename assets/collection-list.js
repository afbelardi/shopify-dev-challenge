class CollectionTabs extends HTMLElement {
    constructor() {
      super();
     
      document.addEventListener("DOMContentLoaded", function(event) {
        const desktopTabs = this.querySelectorAll('.tabs-desktop li');
        const firstTab = desktopTabs[0];
        firstTab.classList.add('active');

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


            const collectionTitle = tab.dataset.collectionTitle;
            console.log(collectionTitle);


            fetchProductsFromCollection(collectionTitle)
              .then((response) => response.text())
              .then((htmlContent) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');
                const products = doc.querySelectorAll('.card');
                console.log(products);
              })
              .catch((error) => {
                console.error(error)
              })

          

          })
        })
       
      })
    }
    }     
    
    

    
  
  
  customElements.define('collection-tabs', CollectionTabs);


  function fetchProductsFromCollection(collectionTitle) {
    console.log('worked');
    return fetch(`/collections/${collectionTitle}`);
  }