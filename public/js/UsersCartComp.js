 Vue.component('usersCart', {

     data() {
         return {
             cartToBuy: [],
             tab: "usersCart",
             i: 0,
         }
     },
     methods: {
         changePages() {
             console.log(this.cartItems);
         },
         addProduct(product) {
             let find = this.cartToBuy.find(el => el.id_product === product.id_product);
             if (find) {
                 this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                 find.quantity++;
             } else {
                 let prod = Object.assign({ quantity: 1 }, product);
                 this.$parent.postJson('/api/cart', prod)
                     .then(data => {
                         if (data.result === 1) {
                             this.cartToBuy.push(prod);
                         }
                     });
             }
         },
         remove(item) {
             if (item.quantity > 1) {
                 this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                     .then(data => {
                         if (data.result === 1) {
                             item.quantity--;
                         }
                     });
             } else {
                 this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                     .then(data => {
                         if (data.result === 1) {
                             this.cartToBuy.splice(this.cartToBuy.indexOf(item), 1);
                         }
                     });
             }
         },
     },
     computed: {
         sumCaunter() {
             const sum = cartToBuy.reduce((total, amount) => total + amount);
             console.log(sum);
         }
     },
     mounted() {
         this.$parent.getJson('/api/cart')
             .then(data => {
                 for (let el of data.contents) {
                     this.cartToBuy.push(el);
                 }
             });
     },

     template: `
     
    <div>
        <div class="header__nav-menu nav-menu--edit">
            <div class="container nav-menu">
                <h1 class="nav-menu__type nav-menu--indent">NEW ARRIVALS</h1>
                <h1 class="nav-menu__type nav-menu--indent">КОРЗИНА</h1>
            </div>
        </div>
      
        <div class="container cart__add">
            <div class="cart__list">
                <div class="cart__one">
                    <cartPage class="cart__goods" 
                    v-for="item of cartToBuy" 
                    :key="item.id_product"
                    :cart-item="item" 
                    :img="item.url">
                    </cartPage>
                        <div class="cart__exit">
                            <button class="cart__exit--btn">CLEAR SHOPPING CART</button>
                            <button class="cart__exit--btn">CONTINUE SHOPPING</button> 
                        </div>
                    </div>
                    <div class="cart__form">
                        <div class="cart__ship">
                            <h2 class="cart__heading">SHIPPING ADRESS</h2>
                            <div class="cart__order">
                                <input class="cart__land" type="text" placeholder="Country">
                                <input class="cart__land" type="text" placeholder="State">
                                <input class="cart__land" type="text" placeholder="Postcode / Zip">
                                <button class="cart__button">GET A QUOTE</button>
                            </div>
                        </div>
                        <div class="cart__input">
                            <p class="cart__sub">SUB TOTAL<span class="cart__sub--mrg">500 ₽</span></p>
                            <p class="cart__grand">GRAND TOTAL<span class="cart__color--price__total">500 ₽</span></p>
                            <div class="cart__check--line">
                                <button class="cart__check" @click="changePages">PROCEED TO CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `

 });

 Vue.component('cartPage', {
     props: ['cartItem', 'img', 'cartToBuy'],
     template: `
     <div>
     <img class="cart__image" :src="img" alt="cart"> 
        <div class="cart__choice">
            <h2 class="cart__type">{{cartItem.product_name}}</h2>
            <p class="cart__text">ЦЕНА: <span class="cart__color--price">{{ cartItem.price }} ₽</span></p>
            <p class="cart__text">Колличество: {{ cartItem.quantity }}</p>
            </br>
            <p class="cart__text">Сумма: <span class="cart__color--price">{{cartItem.quantity*cartItem.price}}₽</span></p>
        </div>
    </div>
    `
 });