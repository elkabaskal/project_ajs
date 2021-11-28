Vue.component('products', {


    data() {
        return {
            products: [],
            filtered: [],
        }
    },

    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        /*  changePages() {
            this.$emit('change', this.tab);
        }
 */
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        //console.log(this.tab);
    },
    template: `
        <div>
            <div class="header__nav-menu nav-menu--edit">
                <div class="container nav-menu">
                    <h1 class="nav-menu__type nav-menu--indent">NEW ARRIVALS</h1>
                    <h1 class="nav-menu__type nav-menu--indent">КАТАЛОГ</h1>
                </div>
            </div>
            <div class="container shop">
                <product ref="product" v-for="item of filtered" :key="item.id_product" :img="item.url" :product="item"></product>
            </div>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
                    <div>
                        <div class="product">
                            <div class="card__image">
                                <img class="card" :src="img" alt="card">
                                <div class="cart__product">
                                    <button class="btn" @click="$root.$refs.cart.addProduct(product)"><img class="cart__card" src="./media/cart.svg" alt="cart">В корзину</button>
                                </div>
                            </div>
                            <div class="card__text">
                                <a class="product__link" href='#'>{{product.product_name}}</a>
                                <p class="product__text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                                <p class="product__price">{{product.price}}₽</p>
                            </div> 
                        </div>
                    </div>  
    `
});