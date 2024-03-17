// Fetch JSON data

fetch('./json/products.json')
    .then(response => response.json())
    .then(data => {
        // Get the products container element
        const productsContainer = document.getElementById('products-container');

        // Loop through the products and create HTML for each product
        data.forEach(product => {
            // Create product element
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            // Create product details
            const productDetails = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            `;

            // Set innerHTML of product element
            productElement.innerHTML = productDetails;

            // Append product element to products container
            productsContainer.appendChild(productElement);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
