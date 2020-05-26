<div id="tuto" class="container py-4">
    <div class="row text-center">
        <div class="title ml-5 col-12">
            <h4>Tutoriel</h4>
            <div class="title-underline-center"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6 mx-auto col-lg-7 mt-3" >
            <div id="slider">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">Slide 1</div>
                        <div class="swiper-slide">Slide 2</div>
                        <div class="swiper-slide">Slide 3</div>
                        <div class="swiper-slide">Slide 4</div>
                        <div class="swiper-slide">Slide 5</div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </div>   
    </div>
</div>
<script>
    var sliderTuto = new Swiper(`#tuto .swiper-container`, {
            loop: true,
            autoHeight: true,
            grabCursor: false,
            slidesPerView: 1,
            autoHeight: true,
            centeredSlides: true,
            speed: 500,
            spaceBetween: 0,
            centeredSlidesBounds: true,
            allowTouchMove: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: `#tuto .swiper-pagination`,
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: `#tuto .swiper-button-next`,
                prevEl: `#tuto .swiper-button-prev`,
            },
        });
</script>