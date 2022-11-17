import React from 'react'
import AnimatedText from 'react-animated-text-content';

function About_section() {
  return (
    <section className="my-5">
      <h2 className="fs-1 fw-bold text-center my-4"><span className="text-primary">About</span> Us</h2>
      <div className="container">
        <div className="back rounded-3 shadow p-3" style={{ height: '350px' }}>
          <div className="w-50 float-end  me-5 p-5">
            <h3 className="text-center mb-4"> <span className="text-primary">W</span>ho <span className="text-primary">W</span>e <span className="text-primary">A</span>re</h3>
            {/* <p className=" mt-5 fw-semibold"><span className="text-primary">W</span>e are the first platform for trading different used stuff with secured and reliable way.<br/>
              We are the most selected platform by customers for buying, selling and exchanging stuff.<br/> 
              </p> */}
            <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
              }}
              animationType="light"
              interval={0.06}
              duration={0.8}
              tag="p"
              className="animated-paragraph fw-bold"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              We are the first platform for trading different used stuff with secured and reliable way.
              We are the most selected platform by customers for buying, selling and exchanging stuff.
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About_section