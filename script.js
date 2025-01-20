let currentSlide = 0;
        const slides = document.querySelectorAll('.banner-img');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active'); // Adiciona a classe 'active' à imagem atual
                } else {
                    slide.classList.remove('active'); // Remove a classe 'active' das outras imagens
                }
            });
        }

        function changeSlide(direction) {
            currentSlide += direction;

            // Ajusta o índice do slide atual
            if (currentSlide < 0) {
                currentSlide = slides.length - 1; // Volta para o último slide
            } else if (currentSlide >= slides.length) {
                currentSlide = 0; // Volta para o primeiro slide
            }

            showSlide(currentSlide); // Exibe o slide atualizado
        }

        // Intervalo automático de troca de slides
        setInterval(() => {
            changeSlide(1); // Avança para o próximo slide
        }, 5000);

        // Exibir o primeiro slide inicialmente
        showSlide(currentSlide);

        // Espera que o conteúdo da página carregue completamente
        window.onload = function() {
            const whatsappButton = document.querySelector('.whatsapp-button');

            window.addEventListener('scroll', function() {
                // Captura a posição do botão e a posição do scroll
                const scrollTop = window.scrollY;
                const targetY = scrollTop + window.innerHeight - 100; // Alvo do botão
                const buttonY = whatsappButton.getBoundingClientRect().top + window.scrollY;

                // Aplica uma transformação suave para mover o botão
                const deltaY = targetY - buttonY;
                whatsappButton.style.transform = `translateY(${deltaY}px)`; // Correção aqui
            });
        };

        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Carrossel Infinito
        const infiniteSlidingTrack = document.querySelector('.infinite-sliding-track');

        // Caminhos corrigidos das imagens
        const infiniteSlidingImages = [
            `img/clientes1.png`,
            `img/clientes3.png`,
            `img/clientes4.png`,
            `img/clientes5.png`,
            `img/clientes6.png`
        ];

        // Função para criar os slides
        function createInfiniteSlide(src) {
            const slide = document.createElement('div');
            slide.className = 'infinite-sliding-slide';

            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Imagem do carrossel deslizante';

            // Fallback caso a imagem não carregue
            img.onerror = () => {
                console.error(`Erro ao carregar a imagem: ${src}`);
                img.src = '/img/fallback.png'; // Substitua pelo caminho da sua imagem de fallback
            };

            slide.appendChild(img);
            return slide;
        }

        // Adiciona as imagens ao carrossel
        infiniteSlidingImages.forEach(src => infiniteSlidingTrack.appendChild(createInfiniteSlide(src)));
        // Duplica as imagens para criar um loop contínuo
        infiniteSlidingImages.forEach(src => infiniteSlidingTrack.appendChild(createInfiniteSlide(src)));

        // Configurações do carrossel infinito
        let infiniteSlidingIndex = 0;
        const infiniteSlidingCount = infiniteSlidingImages.length;
        const infiniteSlidingWidth = 100 / infiniteSlidingCount;

        function moveInfiniteCarousel() {
            infiniteSlidingIndex++;
            infiniteSlidingTrack.style.transition = 'transform 0.5s ease';
            infiniteSlidingTrack.style.transform = `translateX(-${infiniteSlidingIndex * infiniteSlidingWidth}%)`;

            if (infiniteSlidingIndex >= infiniteSlidingCount) {
                setTimeout(() => {
                    infiniteSlidingTrack.style.transition = 'none';
                    infiniteSlidingIndex = 0;
                    infiniteSlidingTrack.style.transform = 'translateX(0)';
                }, 500);
            }
        }

        // Inicia o carrossel infinito
        setInterval(moveInfiniteCarousel, 3000);

        // Ajusta o carrossel ao redimensionar a janela
        window.addEventListener('resize', () => {
            infiniteSlidingTrack.style.transition = 'none';
            infiniteSlidingTrack.style.transform = `translateX(-${infiniteSlidingIndex * infiniteSlidingWidth}%)`;
        });