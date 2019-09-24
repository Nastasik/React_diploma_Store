import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return (
        <footer className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <section>
                        <h3>Информация</h3>
                        <ul className="nav flex-column">
                            <Link to="/about.html" className="nav-link"><li className="nav-item">О магазине</li></Link>
                            <Link to="/catalog.html" className="nav-link"><li className="nav-item">Каталог</li></Link>
                            <Link to="/contacts.html" className="nav-link"><li className="nav-item">Контакты</li></Link>
                            {/* <li class="nav-item"><a href="/about.html" class="nav-link">О магазине</a></li>
                            <li class="nav-item"><a href="/catalog.html" class="nav-link">Каталог</a></li>
                            <li class="nav-item"><a href="/contacts.html" class="nav-link">Контакты</a></li> */}
                        </ul>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <h3>Принимаем к оплате:</h3>
                            <div className="footer-pay">
                                <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                                <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                                <div className="footer-pay-systems footer-pay-systems-visa"></div>
                                <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                                <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                                <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                            </div>
                    </section>
                    <section>
                        <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
                            Все права защищены.<br/>Доставка по всей России!
                        </div>
                    </section>
                </div>
                <div className="col text-right">
                    <section className="footer-contacts">
                        <h3>Контакты:</h3>
                            <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                            <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
                            <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
                            <div className="footer-social-links">
                                <div className="footer-social-link footer-social-link-twitter"></div>
                                <div className="footer-social-link footer-social-link-vk"></div>
                            </div>
                    </section>
                </div>
            </div>        
        </footer>
    )
}

export default Footer


