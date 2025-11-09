import React from 'react';

const Footer = () => {
    return (
        <footer className=" max-w-11/12 mx-auto">
            <div className="footer sm:footer-horizontal  text-neutral-content p-10">
                <nav>
                    <h6 className="footer-title">Contact Info</h6>
                    <p>Street:   ullon road, west rampura, rampura, 1219</p>
                    <p>City:Dhaka</p>
                    <p>State/province/area:Dhaka</p>
                    <p>Country:  Bangladesh</p>
                </nav>

                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Social</h6>
                    <a className="link link-hover">X</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">Facebook</a>
                    <a className="link link-hover">GitHub</a>
                </nav>
            </div>
            <aside className='text-center text-white p-4'>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Trade Sphere Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;