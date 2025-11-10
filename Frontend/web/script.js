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
            const index = this.cart.findIndex(item => item.id === lesson.id);
            if (index !== -1) {
                this.removeFromCart(this.cart[index], index);
            }
        },
        toggleCartPage() {
            this.showCartPage = !this.showCartPage;
        },
        cartCount(lessonId) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === lessonId) {
                    count++;
                }
            }
            return count;
        },
        submitOrder() {
            alert('Order submitted successfully!');
            this.cart = [];
            this.showCartPage = false;
        },
        fetchLessons() {
            fetch('http://localhost:3000/lessons')
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
                    console.error('Error fetching lessons:', error);
                });
        }
    },
    computed: {
        filteredAndSortedLessons() {
            let lessonsArray = this.lessons.slice(0);

            if (this.searchQuery) {
                lessonsArray = lessonsArray.filter(lesson =>
                    lesson.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

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
        isNameValid() {
            return /^[A-Za-z\s]+$/.test(this.checkoutName);
        },
        isPhoneValid() {
            return /^\d+$/.test(this.checkoutPhone);
        },
        isCheckoutFormInvalid() {
            return !this.isNameValid || !this.isPhoneValid || this.checkoutName === '' || this.checkoutPhone === '';
        },
        showNameError() {
            return this.checkoutName !== '' && !this.isNameValid;
        },
        showPhoneError() {
            return this.checkoutPhone !== '' && !this.isPhoneValid;
        }
    },
    created() {
        this.fetchLessons();
    }
});

app.mount('#app');