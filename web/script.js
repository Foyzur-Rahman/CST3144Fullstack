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
                },
                {
                    id: 5,
                    subject: 'Art',
                    location: 'London',
                    price: 80,
                    spaces: 5,
                    image: 'img/art.png'
                },
                {
                    id: 6,
                    subject: 'Music',
                    location: 'Online',
                    price: 85,
                    spaces: 5,
                    image: 'img/music.png'
                },
                {
                    id: 7,
                    subject: 'Geography',
                    location: 'Birmingham',
                    price: 110,
                    spaces: 5,
                    image: 'img/geography.png'
                },
                {
                    id: 8,
                    subject: 'Computing',
                    location: 'Online',
                    price: 130,
                    spaces: 5,
                    image: 'img/computing.png'
                },
                {
                    id: 9,
                    subject: 'Drama',
                    location: 'London',
                    price: 90,
                    spaces: 5,
                    image: 'img/drama.png'
                },
                {
                    id: 10,
                    subject: 'Sport',
                    location: 'Manchester',
                    price: 105,
                    spaces: 5,
                    image: 'img/sport.png'
                }
            ],
            cart: [],
            sortAttribute: 'subject',
            sortOrder: 'asc'
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
        toggleCartPage() {
            this.showCartPage = !this.showCartPage;
        }
    },
    computed: {
        sortedLessons() {
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
        }
    }
});

app.mount('#app');