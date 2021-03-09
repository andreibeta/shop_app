import React from 'react';
import image1 from "../images/homepage-sneaker2.jpg";
import image2 from "../images/homepage-sneaker4.jpg";
import image3 from "../images/homepage-sneaker5.jpg";
import image4 from "../images/homepage-sneaker3.jpg";
import image5 from "../images/homepage-sneaker6.jpg";
import image6 from "../images/homepage-sneaker7.jpg";
import image7 from "../images/homepage-sneaker8.jpg";
import image8 from "../images/homepage-sneaker9.jpg";
import image9 from "../images/homepage-sneaker10.jpg";

import {FiFileText} from 'react-icons/fi';
function HomeScreen(props) {
    return(
        <div className="homepage">
            <h1 className="homepage__title">Cool sneakers reimagined for modern life</h1>
            <a className="homepage__button" href="/products">SHOP NOW</a>
            <figure className="homepage__item"><img src={image1} className="homepage__img" /></figure>
            <figure className="homepage__item2"><img src={image2} className="homepage__img2" /></figure>
            <h1 className="homepage__titleContent">Designed for fashion. Crafted for sport.</h1>
            <p className="homepage__content">We make products that effortlessly transition from day to night. From the board room to the fitness studio, and everywhere in between, each Nomads piece is thoughtfully created to be the perfect balance of form and function. </p>
            <figure className="homepage__item3"><img src={image3} className="homepage__img" /></figure>
            <h3 className="homepage__listTitle"> Luxury materials</h3>
            <p className="homepage__listContent">
                Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.
            </p>
            <figure className="homepage__item4"><img src={image4} className="homepage__img" /></figure>
            <h3 className="homepage__listTitle2"> Thoughtful design</h3>
            <p className="homepage__listContent2">
                Your sneakers is your ultimate companion and should be thoughtfully designed with your lifestyle in mind. Keep up with your love of exercise and travel in comfort and style.
            </p>
            <figure className="homepage__item5"><img src={image5} className="homepage__img" /></figure>
            <h3 className="homepage__listTitle3"> Well-crafted</h3>
            <p className="homepage__listContent3">
            We design versatile and smart-looking sports sneakers that can transition from street to fitness studio, business meeting to dinner, and everywhere in between
            </p>
            <figure className="homepage__item6"><img src={image6} className="homepage__img" /></figure>
            <h2 className="homepage__item6-description">
            Why choose between fashion and function? Our sneakers combine high-quality fabrics and hardware with sport functionality.
            </h2>
            <FiFileText className="homepage__icon1"></FiFileText>
            <FiFileText className="homepage__icon2"></FiFileText>
            <FiFileText className="homepage__icon3"></FiFileText>
            <p className="homepage__reviews1">
            Deleniti similique ut est, congue singulis ei vix. Te sed vocent lobortis. Mei ea fugit fabulas corrumpit, no eum justo integre. Mucius deseruisse at mel, usu zril sententiae ex, has etiam inani pertinacia ex.
            </p>
            <p className="homepage__reviewsTag1">-The New York Times</p>
            <p className="homepage__reviews2">
            Emet vivendo explicari eum id. Ut reque aliquam qui. Ex nusquam iudicabit evertitur eam, in augue insolens constituto eam. Ne vix lorem ullum iusto, has te appareat perfecto adolescens, est laudem eirmod eu.
            </p>
            <p className="homepage__reviewsTag2">-Esquire</p>
            <p className="homepage__reviews3">
            His agam noster maluisset no. Eu evertitur neglegentur mel, vel cu alii modus forensibus. Nam ut errem exerci aeterno, duo luptatum consulatu te, oporteat mediocritatem eum ea. Velit tollit ut vis, posse rationibus ut me
            </p>
            <p className="homepage__reviewsTag3">-The New York Magazine</p>
            <figure className="homepage__item7"><img src={image7} className="homepage__img" /></figure>
            <figure className="homepage__item8"><img src={image8} className="homepage__img" /></figure>
            <figure className="homepage__item9"><img src={image9} className="homepage__img" /></figure>
        </div>
    )
}

export default HomeScreen;