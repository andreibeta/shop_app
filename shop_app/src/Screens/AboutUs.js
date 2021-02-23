import React from 'react';
import image1 from '../images/aboutUs-sneaker1.jpg';
import image2 from '../images/aboutUs-sneaker2.jpg';
import image3 from '../images/aboutUs-sneaker3.jpg';
function AboutUs(props) {
    return (
        <div className="aboutUs">
        <div className="aboutUs__title">
            <h2 >About Us</h2>
            <h3>Sneakers reimagined for modern life</h3>
        </div>
        <div className="aboutUs__content">
            <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Amet facilisis magna etiam tempor orci eu. 
            Sed faucibus turpis in eu mi bibendum neque egestas congue.
            </h3>
            <p>
            Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Vitae purus faucibus ornare suspendisse sed nisi lacus. Urna neque viverra justo nec ultrices dui sapien eget mi. Maecenas accumsan lacus vel facilisis volutpat est. Ut sem nulla pharetra diam sit amet. At imperdiet dui accumsan sit. Dictum varius duis at consectetur lorem donec massa. Amet consectetur adipiscing elit ut aliquam purus. Urna id volutpat lacus laoreet non curabitur gravida arcu.
            </p>
            <p>
            Ut sem nulla pharetra diam sit. Eget nunc lobortis mattis aliquam. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Aenean et tortor at risus viverra. Vulputate eu scelerisque felis imperdiet. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Condimentum vitae sapien pellentesque habitant morbi tristique. Malesuada fames ac turpis egestas integer eget aliquet nibh. Id volutpat lacus laoreet non curabitur gravida arcu ac. Commodo elit at imperdiet dui. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Tincidunt eget nullam non nisi est sit amet. Elit sed vulputate mi sit amet mauris. Amet massa vitae tortor condimentum lacinia quis. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Nisl nisi scelerisque eu ultrices vitae. Sem et tortor consequat id porta.
            </p>
            <p>
            Convallis tellus id interdum velit laoreet id donec. Egestas erat imperdiet sed euismod nisi porta lorem mollis. Cursus metus aliquam eleifend mi. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Scelerisque in dictum non consectetur a erat nam. Fames ac turpis egestas maecenas pharetra convallis. Dignissim enim sit amet venenatis. Imperdiet proin fermentum leo vel. Tincidunt lobortis feugiat vivamus at augue eget. Neque viverra justo nec ultrices dui sapien. In ornare quam viverra orci sagittis eu volutpat odio. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet aliquam id diam maecenas. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Quisque sagittis purus sit amet volutpat consequat mauris nunc.
            </p>
        </div>
            <figure className="aboutUs__item"><img className="aboutUs__img" src={image1}/></figure>
            <figure className="aboutUs__item2"><img className="aboutUs__img" src={image2}/></figure>
            <figure className="aboutUs__item3"><img className="aboutUs__img" src={image3}/></figure>
        </div>
    );
}

export default AboutUs;