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
        toggleCartPage() {
            this.showCartPage = !this.showCartPage;
        }
    }
});

app.mount('#app');