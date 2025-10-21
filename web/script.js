const app = Vue.createApp({
    data() {
        return {
            siteName: 'School Lessons',
            showCartPage: false,
            lessons: [
                {
                    id: 1,
                    subject: 'Mathematics',
                    location: 'London',
                    price: 100,
                    spaces: 5,
                    image: 'img/math.png'
                },
                {
                    id: 2,
                    subject: 'Science',
                    location: 'Bristol',
                    price: 120,
                    spaces: 5,
                    image: 'img/science.png'
                },
                {
                    id: 3,
                    subject: 'English',
                    location: 'Online',
                    price: 90,
                    spaces: 5,
                    image: 'img/english.png'
                },
                {
                    id: 4,
                    subject: 'History',
                    location: 'Manchester',
                    price: 95,
                    spaces: 5,
                    image: 'img/history.png'
                }
            ],
            cart: []
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
            const index = this.cart.lastIndexOf(lesson);
            if (index > -1) {
                this.removeFromCart(lesson, index);
            }
        },
        toggleCartPage() {
            this.showCartPage = !this.showCartPage;
        },
        cartCount(lesson) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === lesson.id) {
                    count++;
                }
            }
            return count;
        }
    }
});

app.mount('#app');