const app = Vue.createApp({
    data() {
        return {
            siteName: 'School Lessons',
            showCartPage: false,
            lessons: [],
            cart: [],
            sortAttribute: 'subject',
            sortOrder: 'asc',
            searchQuery: '',
            checkoutName: '',
            checkoutPhone: ''
        };
    },
    methods: {
        addToCart(lesson) {
            this.cart.push(lesson);
            lesson.spaces -= 1;
        },
        removeFromCart(item, index) {
            this.cart.splice(index, 1);
            item.spaces += 1;
        },
        removeOneFromCart(lesson) {
            const index = this.cart.findIndex(item => item._id === lesson._id);
            if (index !== -1) {
                this.removeFromCart(this.cart[index], index);
            }
        },
        toggleCartPage() {
            this.showCartPage = !this.showCartPage;
        },
        cartCount(lesson_id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i]._id === lesson_id) {
                    count++;
                }
            }
            return count;
        },
        submitOrder() {
            const order = {
                name: this.checkoutName,
                phone: this.checkoutPhone,
                items: this.cart
            };

            fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            })
            .then(response => response.json())
            .then(orderData => {
                
                this.cart.forEach(item => {
                    fetch(`http://localhost:3000/lessons/${item._id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ spaces: item.spaces })
                    });
                });

                alert('Order submitted successfully!');
                this.cart = [];
                this.checkoutName = '';
                this.checkoutPhone = '';
                this.showCartPage = false;
            })
            .catch(error => {
                console.error(error);
            });
        },
        searchLessons() {
            let url = 'http://localhost:3000/lessons';
            if (this.searchQuery) {
                url = `http://localhost:3000/search?q=${this.searchQuery}`;
            }

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.lessons = data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    computed: {
        filteredAndSortedLessons() {
            let lessonsArray = this.lessons.slice(0);
            
            lessonsArray.sort((a, b) => {
                let comparison = 0;
                if (a[this.sortAttribute] > b[this.sortAttribute]) {
                    comparison = 1;
                } else if (a[this.sortAttribute] < b[this.sortAttribute]) {
                    comparison = -1;
                }
                return (this.sortOrder === 'asc') ? comparison : comparison * -1;
            });

            return lessonsArray;
        },
        isCheckoutFormInvalid() {
            return this.checkoutName === '' || 
                   this.checkoutPhone === '' || 
                   this.showNameError || 
                   this.showPhoneError;
        },
        showNameError() {
            const nameRegex = /^[A-Za-z\s]+$/;
            return this.checkoutName !== '' && !nameRegex.test(this.checkoutName);
        },
        showPhoneError() {
            const phoneRegex = /^[0-9]+$/;
            return this.checkoutPhone !== '' && !phoneRegex.test(this.checkoutPhone);
        }
    },
    watch: {
        searchQuery() {
            this.searchLessons();
        }
    },
    created() {
        this.searchLessons();
    }
});

app.mount('#app');