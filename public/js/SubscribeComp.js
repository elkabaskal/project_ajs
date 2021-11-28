Vue.component('subscribe', {
    data() {
        return {
            mail: '',
        }
    },
    methods: {
        sendMail() {
            console.log(this.mail);
        }
    },
    template: `
                <div class="subscribe">
                    <div class="shadow__footer">
                        <div class="container subscribe__content">
                            <div class="footer__quote">
                                <img class="footer__image" src="./media/face.png" alt="Quality">
                                <p class="footer__text">&laquo;Vestibulum quis porttitor dui! Quisque viverra nunc&nbsp;mi, a&nbsp;pulvinar purus condimentum&raquo;</p>
                            </div>
                            <div class="footer__subscribe">
                                <p class="subscribe__text"><span class="subscribe__heading">SUBSCRIBE</span><br> FOR OUR NEWLETTER AND PROMOTION</p>
                                    <input class="send__text" type="email" placeholder="Enter Your Email" v-model="mail">
                                     <button class="send" @click="sendMail">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
    `
});