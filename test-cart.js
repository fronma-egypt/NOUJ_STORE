// Test script to demonstrate adding products to cart
// This can be used on product pages or for testing

// Sample products data
const sampleProducts = [
    {
        id: "prod1",
        name: "كرتونة شاي دودز 12 علبة",
        price: 1728,
        image: "box2.png",
        unit: "كرتونة",
        discount: 10
    },
    {
        id: "prod2", 
        name: "علبة شاي دودز 12 عبوة",
        price: 288,
        image: "box1.png",
        unit: "علبة",
        discount: 5
    },
    {
        id: "prod3",
        name: "كرتونة 12 وجبة",
        price: 360,
        image: "box2.png",
        unit: "كرتونة",
        discount: 15
    }
];

// Function to add sample products to cart (for testing)
function addSampleProducts() {
    sampleProducts.forEach(product => {
        addToCart(
            product.id,
            product.name,
            product.price,
            product.image,
            product.unit,
            product.discount
        );
    });
}

// Function to create test buttons on the page
function createTestButtons() {
    const testContainer = document.createElement('div');
    testContainer.style.position = 'fixed';
    testContainer.style.top = '10px';
    testContainer.style.left = '10px';
    testContainer.style.zIndex = '1000';
    testContainer.style.background = 'rgba(255,255,255,0.9)';
    testContainer.style.padding = '10px';
    testContainer.style.borderRadius = '8px';
    testContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    testContainer.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #333;">اختبار السلة</h4>
        <button onclick="addSampleProducts()" style="
            background: #4CAF50;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            font-size: 12px;
        ">إضافة منتجات تجريبية</button>
        
        <button onclick="clearCart()" style="
            background: #f44336;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            font-size: 12px;
        ">تفريغ السلة</button>
        
        <button onclick="location.reload()" style="
            background: #2196F3;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            font-size: 12px;
        ">تحديث الصفحة</button>
    `;
    
    document.body.appendChild(testContainer);
}

// Add test buttons when page loads
if (window.location.href.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', createTestButtons);
}

// Example usage on product pages:
/*
// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productData = this.dataset;
        addToCart(
            productData.id,
            productData.name,
            productData.price,
            productData.image,
            productData.unit,
            productData.discount || 0
        );
    });
});
*/

console.log('✅ Test cart script loaded successfully!');
console.log('Available functions:');
console.log('- addToCart(id, name, price, image, unit, discount)');
console.log('- addSampleProducts() - Adds test products');
console.log('- clearCart() - Clears the cart');
