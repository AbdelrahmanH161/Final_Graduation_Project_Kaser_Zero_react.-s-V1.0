import React, { useState } from 'react';
import { Carousel } from "react-bootstrap";
import AnimatedText from 'react-animated-text-content';

function Choose_us_section() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        if (selectedIndex >= 3 || selectedIndex < 0) {
            this.setIndex(0);
        } else if (selectedIndex !== index) {
            setIndex(selectedIndex);
        }
    };
    return (
        <section className="my-5">
            <h2 className="fs-1 fw-bold text-center my-4"><span className="text-primary">Why</span> Choose Us <span className="text-primary">?</span> </h2>
            <div className="container">
                <div className="shadow rounded-3">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <div className="img1 d-block w-100 " style={{ height: '350px' }}>
                                <div className="w-50 float-end mt-4 me-5 p-5">
                                    <h3 className="text-center mb-4"> <span className="text-primary">S</span>ell , <span className="text-primary">B</span>uy &amp; <span className="text-primary">E</span>xchange</h3>
                                    {/* <p className=" mt-5 fw-semibold"><span className="text-primary">I</span>n our site ,we offer many categories of product. You will find what you want here, and if you didn't find it, just type in your Wish List what you want and we will tell you if it's available.
                                    </p> */}
                                    <AnimatedText
                                        type="words" // animate words or chars
                                        animation={{
                                            x: '200px',
                                            y: '-20px',
                                            scale: 1.1,
                                            ease: 'ease-in-out',
                                        }}
                                        animationType="float"
                                        interval={0.06}
                                        duration={0.8}
                                        tag="p"
                                        className="animated-paragraph fw-bold"
                                        includeWhiteSpaces
                                        threshold={0.1}
                                        rootMargin="20%"
                                    >
                                        In our site ,we offer many categories of product. You will find what you want here, and if you didn't find it, just type in your Wish List what you want and we will tell you if it's available.
                                    </AnimatedText>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="img2 d-block w-100 " style={{ height: '350px' }}>
                                <div className="w-50 float-end mt-4 me-5 p-5">
                                    <h3 className="text-center mb-4"> <span className="text-primary">S</span>ell , <span className="text-primary">B</span>uy &amp; <span className="text-primary">E</span>xchange</h3>
                                    {/* <p className=" mt-5 fw-semibold"><span className="text-primary">I</span>n our site, we guarantee the security of our customers identities and the quality of stuff we offer in our site.<br />
                                        <span className="text-primary">I</span>n our site ,you can sell your used product or exchange it with others products. You can buy used stuff as well.
                                    </p> */}
                                    <AnimatedText
                                        type="words" // animate words or chars
                                        animation={{
                                            x: '200px',
                                            y: '-20px',
                                            scale: 1.1,
                                            ease: 'ease-in-out',
                                        }}
                                        animationType="float"
                                        interval={0.06}
                                        duration={0.8}
                                        tag="p"
                                        className="animated-paragraph fw-bold"
                                        includeWhiteSpaces
                                        threshold={0.1}
                                        rootMargin="20%"
                                    >
                                    In our site, we guarantee the security of our customers identities and the quality of stuff we offer in our site.
                                    In our site ,you can sell your used product or exchange it with others products. You can buy used stuff as well.
                                    </AnimatedText>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

export default Choose_us_section