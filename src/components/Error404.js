import React from 'react'

function Error404(props) {
    
    return (
        <main class="container">
            <div class="row">
                <div class="col">
                    <div class="banner">
                        <img src="/img/banner.jpg" class="img-fluid" alt="К весне готовы!"/>
                        <h2 class="banner-header">К весне готовы!</h2>
                    </div>

                    <section class="top-sales">
                        <h2 class="text-center">Страница не найдена</h2>
                        <p>
                            Извините, такая страница не найдена!
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Error404

