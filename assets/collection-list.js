class CollectionTabs extends HTMLElement {
    constructor() {
      super();
     
      document.addEventListener("DOMContentLoaded", () => {

        //Grabbing first li to make active when the page loads
        const desktopTabs = this.querySelectorAll('.tabs-desktop li');
        const firstTab = desktopTabs[0];
        firstTab.classList.add('active');

        const firstCollectionTab = document.querySelector("[data-collection-url]");
        const firstCollectionUrl = firstCollectionTab.dataset.collectionUrl;
      
        //Making a call to get the products from the first collection in the list
        this.fetchSection(firstCollectionUrl);

        //Giving the actual title the active class to change its color
        const firstTitle = firstTab.querySelector('.collection_titles');
        firstTitle.classList.add('active');

        //Whenever a new collection item is clicked, the active class switches to the target
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

            //Updating the url to whichever collection is clicked on
            this.updateURL(tab.dataset.collectionUrl);
          })
        })
      })

      //Handling getting products for collection selected through mobile dropdown
      const mobileSelect = document.querySelector('.tabs-mobile');
            mobileSelect.addEventListener("change", () => {
              const selectedCollectionUrl = mobileSelect.value;
              this.fetchSection(selectedCollectionUrl);   
              this.updateURL(selectedCollectionUrl);
              
            });
            
  
      //The collection title that gets selected will be the current collection that shows when
      //switching to mobile and seeing the dropdown. Getting the collection that is clicked on
      this.querySelectorAll("[data-collection-url]").forEach( tab => { 
        tab.addEventListener('click', (e) => { 
         this.fetchSection(tab.dataset.collectionUrl);
         mobileSelect.value = tab.dataset.collectionUrl;
        });
      });
    }

     //Updating the URL when a new collection is selected
     updateURL(collectionUrl) {
      const newURL = window.location.origin + collectionUrl;
      window.history.pushState({ path: newURL }, '', newURL);
    }


    async fetchSection (collectionUrl) {
      const response = await fetch(collectionUrl + "/?sections=retrieved-section");

      const data = await response.text();
      const sections = JSON.parse(data);
      const thisDocument = new DOMParser().parseFromString(sections['retrieved-section'], 'text/html');
      const pageWidthContent = thisDocument.querySelector('.shopify-section').innerHTML;
      const targetElement = document.querySelector('[data-section-id="retrieved-section"]');
      targetElement.innerHTML = pageWidthContent;
      updateURL(collectionUrl);
    }
  }     
    
    
  
    
 
  
  customElements.define('collection-tabs', CollectionTabs);

          