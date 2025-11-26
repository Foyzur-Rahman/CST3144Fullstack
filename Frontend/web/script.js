const app = Vue.createApp({
    data() {
        return {
            // App state variables
            siteName: 'School Lessons',
            showCartPage: false,
            lessons: [],
            cart: [],
            searchQuery: '',
            
            // Sort settings
            sortAttribute: 'subject',
            sortOrder: 'asc',
            
            // Checkout form data
            checkoutName: '',
            checkoutPhone: ''
        };
    },
    methods: {
        // Add item to cart and decrease availability
        addToCart(lesson) {
            this.cart.push(lesson);
            lesson.spaces -= 1;
        },
        
        // Remove item from cart and restores availability
        removeFromCart(item, index) {
            this.cart.splice(index, 1);
            item.spaces += 1;
        },

        // Remove specific item from cart (used in lesson view)
        removeOneFromCart(lesson) {
            const index = this.cart.findIndex(item => item._id === lesson._id);
            if (index !== -1) {
                this.removeFromCart(this.cart[index], index);
            }
        },
        
        // Navigation toggle
        toggleCartPage() {
            this.showCartPage = !this.showCartPage;
        },
        
        // Helper to count items in cart
        cartCount(lesson_id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i]._id === lesson_id) {
                    count++;
                }
            }
            return count;
        },
        
        // Handle order submission
        submitOrder() {
            const order = {
                name: this.checkoutName,
                phone: this.checkoutPhone,
                items: this.cart
            };

            // Send order to backend
            fetch('https://cst3144-backend1.onrender.com/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            })
            .then(() => {
                // Update backend for each purchased item
                this.cart.forEach(item => {
                    fetch(`https://cst3144-backend1.onrender.com/lessons/${item._id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ spaces: item.spaces })
                    });
                });
                
                // Reset app state
                alert('Order submitted!');
                this.cart = [];
                this.checkoutName = '';
                this.checkoutPhone = '';
                this.showCartPage = false;
            });
        },
        
        // Fetch lesson data when searching from backend
        searchLessons() {
            let url = 'https://cst3144-backend1.onrender.com/lessons';
            
            if (this.searchQuery) {
                url = `https://cst3144-backend1.onrender.com/search?q=${this.searchQuery}`;
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.lessons = data;
                });
        }
    },
    computed: {
        // Sort logic for the lessons list
        filteredAndSortedLessons() {
            let lessonsArray = this.lessons.slice(0);
            
            lessonsArray.sort((a, b) => {
                let valA = a[this.sortAttribute];
                let valB = b[this.sortAttribute];

                // Convert strings to lowercase for fair comparison
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                let comparison = 0;
                if (valA > valB) {
                    comparison = 1;
                } else if (valA < valB) {
                    comparison = -1;
                }

                // Flip result if descending
                return (this.sortOrder === 'desc') ? comparison * -1 : comparison;
            });

            return lessonsArray;
        },
        
        // Form validation logic
        isCheckoutFormInvalid() {
            return this.checkoutName === '' || 
                   this.checkoutPhone === '' || 
                   this.showNameError || 
                   this.showPhoneError;
        },
        
        // Input validation helpers
        showNameError() {
            const regex = /^[A-Za-z\s]+$/;
            return this.checkoutName !== '' && !regex.test(this.checkoutName);
        },
        showPhoneError() {
            const regex = /^[0-9]+$/;
            return this.checkoutPhone !== '' && !regex.test(this.checkoutPhone);
        }
    },
    watch: {
        // Real-time search
        searchQuery() {
            this.searchLessons();
        }
    },
    created() {
        // Initial data load
        this.searchLessons();
    }
});

app.mount('#app');